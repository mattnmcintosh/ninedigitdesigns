// src/pages/ArtClasses.jsx
import React from 'react';
import wpData from '../data/wordpressContent.json';
import { Container, Typography } from '@mui/material';

export default function ArtClasses() {
  const page = wpData.find((item) => item.slug === 'art-classes' || item.slug === 'classes');

  if (!page) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Art Classes page content not found in local data.</Typography>
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