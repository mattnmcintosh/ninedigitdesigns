import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Paper, CircularProgress, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ArtClasses() {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWPContent = async () => {
      try {
        const response = await fetch(
          'https://public-api.wordpress.com/wp/v2/sites/9digitdesigns.wordpress.com/pages?slug=art-classes',
          {
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_WP_TOKEN}`
            }
          }
        );
        const data = await response.json();
        
        // The v2 API returns an array of matching pages
        if (data && data.length > 0) {
          setPageContent({
            title: data[0].title.rendered,
            body: data[0].content.rendered
          });
        }
      } catch (error) {
        console.error("WP Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWPContent();
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  if (!pageContent) return <Typography>Content not found.</Typography>;

  return (
    <Box>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        fontWeight="bold"
        color="var(--text-heading, inherit)"
        dangerouslySetInnerHTML={{ __html: pageContent.title }}
      />
      
      <Grid container spacing={4} sx={{ mt: 1 }}>
        <Grid item xs={12} md={8}>
          <Box 
            sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: pageContent.body }} 
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ p: 3, bgcolor: 'var(--site-bg, #f5f5f5)', borderRadius: 2, textAlign: 'center', border: '1px solid var(--border-light, #e0e0e0)' }}
          >
            <Typography variant="h6" gutterBottom color="var(--text-heading, inherit)">Ready to create?</Typography>
            <Typography variant="body2" paragraph sx={{ mb: 3 }}>
              Reach out to reserve your spot in an upcoming class or to ask about private lessons.
            </Typography>
            <Button component={Link} to="/contact" variant="contained" color="primary" fullWidth size="large" disableElevation>
              Contact Me to Register
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}