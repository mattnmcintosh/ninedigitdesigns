// src/pages/Blog.jsx
import React from 'react';
import wpData from '../data/wordpressContent.json';
import { Container, Typography, Box } from '@mui/material';

export default function Blog() {
  // Safely guard against wpData being undefined or not a direct array
  const dataArray = Array.isArray(wpData) ? wpData : wpData?.default || [];
  const posts = dataArray.filter((item) => item && item.type === 'post');

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Blog
      </Typography>
      {posts.length === 0 ? (
        <Typography>No blog posts found in local data.</Typography>
      ) : (
        posts.map((post, index) => (
          <Box key={index} sx={{ mb: 6 }}>
            <Typography variant="h5" gutterBottom>
              {post.title || 'Untitled'}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
          </Box>
        ))
      )}
    </Container>
  );
}