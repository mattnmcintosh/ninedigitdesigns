import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Alert } from '@mui/material';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  // Example handler for Netlify form submissions
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => setSubmitted(true))
      .catch((error) => alert(error));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Contact Me</Typography>
      
      {submitted ? (
        <Alert severity="success">Thank you! Your message has been sent.</Alert>
      ) : (
        <Box 
          component="form" 
          name="contact" 
          method="POST" 
          data-netlify="true" 
          data-netlify-honeypot="bot-field" 
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {/* Netlify hidden input required for React SPAs */}
          <input type="hidden" name="form-name" value="contact" />

          {/* 🛑 THE HONEYPOT TRAP (Hidden from real users, visible to bots) */}
          <Box sx={{ display: 'none' }}>
            <label>
              Don't fill this out if you're human: <input name="bot-field" />
            </label>
          </Box>

          <TextField label="Your Name" name="name" required fullWidth />
          <TextField label="Your Email" name="email" type="email" required fullWidth />
          <TextField label="Message" name="message" multiline rows={4} required fullWidth />

          <Button type="submit" variant="contained" color="primary" size="large">
            Send Message
          </Button>
        </Box>
      )}
    </Container>
  );
}