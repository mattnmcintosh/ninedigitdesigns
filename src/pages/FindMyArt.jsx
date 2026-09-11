// src/pages/FindMyArt.jsx
import React, { useState } from 'react';
import wpData from '../data/wordpressContent.json';
import { Container, Typography, TextField, Box, Grid, Card, CardContent, CardMedia, Chip } from '@mui/material';
import { cleanWordPressContent } from '../utils/cleanShortcodes';

export default function FindMyArt() {
  const [searchTerm, setSearchTerm] = useState('');
  const dataArray = Array.isArray(wpData) ? wpData : wpData?.default || [];

  // Filter posts, attachments, or gallery entries matching the search keyword
  const filteredItems = dataArray.filter((item) => {
    const titleMatch = item.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const contentMatch = item.content?.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || contentMatch;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Find My Art
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Search through catalog records, specific titles, and categories to locate artwork.
      </Typography>

      <TextField
        fullWidth
        label="Search artwork by keyword, title, or description..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={3}>
        {filteredItems.slice(0, 12).map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined" sx={{ height: 'display: flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {item.title || 'Untitled Artwork'}
                </Typography>
                <Chip label={item.type || 'Page'} size="small" sx={{ mb: 2 }} />
                <Box 
                  sx={{ fontSize: '0.875rem', color: 'text.secondary', overflow: 'hidden', maxHeight: '100px' }}
                  dangerouslySetInnerHTML={{ __html: cleanWordPressContent(item.content?.substring(0, 150) + '...') }} 
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}