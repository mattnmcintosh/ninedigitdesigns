import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Paper, CircularProgress, Card, CardContent, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ====================================================================
    // LIVE WORDPRESS FETCH LOGIC
    // Uncomment this block to pull her actual blog posts from the site.
    // ====================================================================
    
    /*
    const fetchWPPosts = async () => {
      try {
        // Fetching the latest posts (defaults to 'post' type)
        const response = await fetch('https://public-api.wordpress.com/rest/v1.1/sites/9digitdesigns.wordpress.com/posts/?number=10');
        const data = await response.json();
        
        if (data.posts) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("WP Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWPPosts();
    */

    // ====================================================================
    // PLACEHOLDER (Delete this when you uncomment the fetch above)
    // ====================================================================
    setTimeout(() => {
      setPosts([
        {
          ID: 1,
          title: 'Welcome to the New Site!',
          date: '2026-08-27T12:00:00',
          content: '<p>I am so excited to share my newly updated portfolio with everyone. Take a look around the gallery and let me know what you think!</p>'
        },
        {
          ID: 2,
          title: 'Upcoming Art Classes',
          date: '2026-07-15T12:00:00',
          content: '<p>Fall schedule is officially open for registration. We will be focusing heavily on color mixing and working with acrylics. Spaces fill up fast!</p>'
        }
      ]);
      setLoading(false);
    }, 500); 

  }, []);

  // Helper function to format the ugly WordPress date string into something readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Blog & Updates
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 1 }}>
        <Grid item xs={12} md={8}>
          
          {posts.length === 0 ? (
            <Typography>No posts found.</Typography>
          ) : (
            posts.map((post) => (
              <Card 
                key={post.ID} 
                elevation={0} 
                sx={{ 
                  mb: 4, 
                  bgcolor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--border-light, #e0e0e0)'
                }}
              >
                <CardContent sx={{ px: 0, pb: '2rem !important' }}>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom
                    color="var(--text-heading, inherit)"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />
                  
                  <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2 }}>
                    Posted on {formatDate(post.date)}
                  </Typography>
                  
                  {/* Safely injects the raw HTML output from her blog posts */}
                  <Box 
                    sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
                    dangerouslySetInnerHTML={{ __html: post.content }} 
                  />
                </CardContent>
              </Card>
            ))
          )}

        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              bgcolor: 'var(--site-bg, #f5f5f5)', 
              borderRadius: 2,
              border: '1px solid var(--border-light, #e0e0e0)'
            }}
          >
            <Typography variant="h6" gutterBottom color="var(--text-heading, inherit)">
              Stay Connected
            </Typography>
            <Typography variant="body2" paragraph>
              Check back here for my latest studio updates, class schedules, and new pieces added to the gallery.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" paragraph>
              Interested in commissioning a custom piece of art?
            </Typography>
            <Button 
              component={Link} 
              to="/contact" 
              variant="outlined" 
              color="primary" 
              fullWidth
            >
              Get in Touch
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}