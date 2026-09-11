// src/pages/Contact.jsx
import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Alert } from '@mui/material';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful Netlify form submission or backend background handler
    setSubmitted(true);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Me
      </Typography>
      {submitted ? (
        <Alert severity="success">Thank you! Your message has been sent.</Alert>
      ) : (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Message"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Send Message
          </Button>
        </Box>
      )}
    </Container>
  );
}