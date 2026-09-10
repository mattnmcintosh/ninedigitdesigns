import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Alert, Paper } from '@mui/material';

export default function ExpandedOrderForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    details: '',
    'bot-field': '' // Honeypot state tracking
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Encode data for Netlify's standard x-www-form-urlencoded format
    const encodeData = (data) => {
      return Object.keys(data)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
    };

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeData({
        'form-name': 'order',
        ...formData
      }),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.error('Order form submission error:', err);
        setError('Failed to submit your order. Please try again later.');
      });
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Expanded Order Form
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Fill out the details below to request a custom print or commission.
        </Typography>

        {submitted ? (
          <Alert severity="success" sx={{ mt: 2 }}>
            Thank you! Your order request has been successfully submitted. We will be in touch shortly.
          </Alert>
        ) : (
          <Box 
            component="form" 
            name="order" 
            method="POST" 
            data-netlify="true" 
            data-netlify-honeypot="bot-field" 
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            {/* Required hidden input tracking the unique form name */}
            <input type="hidden" name="form-name" value="order" />

            {/* Honeypot Trap - Hidden from actual users, catches bots */}
            <Box sx={{ display: 'none' }}>
              <label>
                Don't fill this out if you're human: 
                <input 
                  name="bot-field" 
                  value={formData['bot-field']} 
                  onChange={handleChange} 
                />
              </label>
            </Box>

            {error && (
              <Alert severity="error">{error}</Alert>
            )}

            <TextField 
              label="Your Name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required 
              fullWidth 
            />

            <TextField 
              label="Your Email" 
              name="email" 
              type="email" 
              value={formData.email}
              onChange={handleChange}
              required 
              fullWidth 
            />

            <TextField 
              label="Order Details & Specifications" 
              name="details" 
              value={formData.details}
              onChange={handleChange}
              multiline 
              rows={6} 
              placeholder="Describe sizes, print choices, or custom requests..."
              required 
              fullWidth 
            />

            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              size="large"
              sx={{ alignSelf: 'flex-start', px: 4, py: 1.5 }}
            >
              Submit Order
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}