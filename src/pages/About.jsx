// src/pages/About.jsx
import React from 'react';
import wpData from '../data/wordpressContent.json';
import { Container, Typography } from '@mui/material';

export default function About() {
  const page = wpData.find((item) => item.slug === 'about' || item.slug === 'about-us');

  if (!page) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>About page content not found in local data.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        {page.title}
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </Container>
  );
}