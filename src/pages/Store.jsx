// src/pages/Store.jsx
import React from 'react';
import wpData from '../data/wordpressContent.json';
import { Container, Typography } from '@mui/material';

export default function Store() {
  const page = wpData.find((item) => item.slug === 'print-prices-and-sizes' || item.slug === 'store');

  if (!page) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Store page content not found in local data.</Typography>
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