// src/pages/Gallery.jsx
import React from 'react';
import wpData from '../data/wordpressContent.json';
import { Container, Typography, Box } from '@mui/material';

export default function Gallery() {
  const dataArray = Array.isArray(wpData) ? wpData : wpData?.default || [];
  const page = dataArray.find((item) => item && (item.slug === 'gallery' || item.slug === 'page'));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Gallery
      </Typography>
      {page && page.content ? (
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      ) : (
        <Box>
          <Typography variant="body1">No gallery content found in local data.</Typography>
        </Box>
      )}
    </Container>
  );
}