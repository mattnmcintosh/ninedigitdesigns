import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Paper, CircularProgress, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Store() {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ====================================================================
    // LIVE WORDPRESS FETCH LOGIC
    // Uncomment this block to pull her actual text from the recovered site.
    // ====================================================================
    
    /*
    const fetchWPContent = async () => {
      try {
        const response = await fetch('https://public-api.wordpress.com/rest/v1.1/sites/9digitdesigns.wordpress.com/posts/?type=page');
        const data = await response.json();
        
        // Find the specific page by its WordPress slug
        const storePage = data.posts.find(p => p.slug === 'store');
        
        if (storePage) {
          setPageContent({
            title: storePage.title,
            body: storePage.content
          });
        }
      } catch (error) {
        console.error("WP Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWPContent();
    */

    // ====================================================================
    // PLACEHOLDER (Delete this when you uncomment the fetch above)
    // ====================================================================
    setTimeout(() => {
      setPageContent({
        title: 'Print Prices and Sizes',
        body: `
          <p><em>Loading content from WordPress...</em></p>
          <p>Once you connect the API, her exact pricing tables, size dimensions, and print details from her current WordPress <strong>Store</strong> page will appear right here, perfectly formatted.</p>
        `
      });
      setLoading(false);
    }, 500); 

  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        fontWeight="bold"
        // This injects the WordPress Page Title
        dangerouslySetInnerHTML={{ __html: pageContent.title }}
      />
      
      <Grid container spacing={4} sx={{ mt: 1 }}>
        <Grid item xs={12} md={8}>
          {/* This box safely injects the raw HTML output from her WordPress editor */}
          <Box 
            sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: pageContent.body }} 
          />
        </Grid>

        {/* Sidebar Call to Action */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              bgcolor: 'var(--site-bg, #f5f5f5)', 
              borderRadius: 2,
              textAlign: 'center',
              border: '1px solid var(--border-light, #e0e0e0)'
            }}
          >
            <Typography variant="h6" gutterBottom color="var(--text-heading, inherit)">
              Ready to Order?
            </Typography>
            <Typography variant="body2" paragraph sx={{ mb: 3 }}>
              If you know what size you want, you can purchase prints directly through the online shop.
            </Typography>
            
            <Button 
              component={Link} 
              to="/buy-online" 
              variant="contained" 
              color="primary" 
              fullWidth
              size="large"
              disableElevation
            >
              Shopify Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}