import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Home() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Home
      </Typography>
      <Typography paragraph>Welcome to my website!</Typography>
      <Typography paragraph>Use these links if you are having problems navigating:</Typography>
      
      <ul>
        <li><Typography component="a" href="/about">About</Typography></li>
        <li><Typography component="a" href="/art-classes">Art Classes</Typography></li>
        <li><Typography component="a" href="/blog">Blog</Typography></li>
        <li><Typography component="a" href="/contact">Contact</Typography></li>
        <li><Typography component="a" href="/expanded-order-form">Expanded Order Form</Typography></li>
        <li><Typography component="a" href="/find-my-art">Find My Art</Typography></li>
        <li><Typography component="a" href="/page">Gallery</Typography></li>
        <li><Typography component="a" href="/store">Print Prices and Sizes</Typography></li>
      </ul>
    </Box>
  );
}