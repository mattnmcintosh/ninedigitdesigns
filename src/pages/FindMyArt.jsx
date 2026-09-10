import React from 'react';
import { Typography, Container, Box } from '@mui/material';

export default function FindMyArt() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Find My Art
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Search tool or print archive information goes here.
      </Typography>
    </Container>
  );
}