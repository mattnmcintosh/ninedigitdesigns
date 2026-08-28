import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';

export default function About() {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the specific page by its WordPress slug (e.g., 'about')
    const fetchPage = async () => {
      try {
        const response = await fetch('https://public-api.wordpress.com/wp/v2/sites/9digitdesigns.wordpress.com/pages?slug=about');
        const data = await response.json();
        
        // The API returns an array, so we grab the first matching page
        if (data && data.length > 0) {
          setPageContent(data[0]);
        }
      } catch (error) {
        console.error("Error fetching page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, []);

  if (loading) return <CircularProgress />;
  if (!pageContent) return <Typography>Page not found.</Typography>;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" 
                  dangerouslySetInnerHTML={{ __html: pageContent.title.rendered }} />
      
      {/* This box safely injects all the HTML paragraphs she wrote in WordPress */}
      <Box 
        sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
        dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }} 
      />
    </Box>
  );
}