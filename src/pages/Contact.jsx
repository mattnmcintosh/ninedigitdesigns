import React, { useState } from 'react';
import { Typography, Box, Grid, Paper, TextField, Button, Alert } from '@mui/material';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState(null); // 'success' or 'error'

  // Helper to handle typing in the fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Helper to encode the form data for Netlify
  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  // Submit the form in the background
  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formData })
    })
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Clear the form
      })
      .catch((error) => {
        console.error(error);
        setStatus('error');
      });
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="var(--text-heading, inherit)">
        Contact Me
      </Typography>

      <Grid container spacing={4} sx={{ mt: 1 }}>
        {/* Left Column: Text & Direct Info */}
        <Grid item xs={12} md={5}>
          <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            If you have questions about my art, want to commission a piece, or are interested in signing up for art classes, I would love to hear from you! 
          </Typography>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom color="textSecondary">
              Direct Contact
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Phone:</strong> (814) 725-1925
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> ninedigitdesigns@yahoo.com
            </Typography>
          </Box>
        </Grid>

        {/* Right Column: Active Netlify Form */}
        <Grid item xs={12} md={7}>
          <Paper elevation={0} sx={{ p: 4, bgcolor: 'var(--site-bg, #f5f5f5)', borderRadius: 2, border: '1px solid var(--border-light, #e0e0e0)' }}>
            
            {status === 'success' && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Thank you! Your message has been sent successfully.
              </Alert>
            )}

            {status === 'error' && (
              <Alert severity="error" sx={{ mb: 3 }}>
                Oops! There was a problem sending your message. Please try again.
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    name="name" // Must match the hidden HTML form exactly
                    label="Your Name"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange}
                    sx={{ bgcolor: 'var(--content-bg, white)' }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Your Email"
                    type="email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{ bgcolor: 'var(--content-bg, white)' }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="message"
                    name="message"
                    label="Message"
                    multiline
                    rows={5}
                    variant="outlined"
                    value={formData.message}
                    onChange={handleChange}
                    sx={{ bgcolor: 'var(--content-bg, white)' }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disableElevation
                    sx={{ mt: 1, py: 1.5 }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}