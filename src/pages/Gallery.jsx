import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardMedia, CardContent, CircularProgress, Box } from '@mui/material';

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  // The base URL for her WordPress REST API
  const wpApiUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/9digitdesigns.wordpress.com';

  /*
  useEffect(() => {
    // Fetch the uploaded media/images from WordPress
    const fetchMedia = async () => {
      try {
        const response = await fetch(`${wpApiUrl}/media?per_page=12`); // Adjust per_page as needed
        const data = await response.json();
        setArtworks(data);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);
  */

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Gallery
      </Typography>
      <Grid container spacing={3}>
        {artworks.map((art) => (
          <Grid item xs={12} sm={6} md={4} key={art.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                // WordPress stores the image URL here
                image={art.source_url} 
                // WordPress stores the title as an object
                alt={art.title?.rendered || 'Artwork'} 
              />
              <CardContent>
                <Typography variant="subtitle1" align="center">
                  {/* We use dangerouslySetInnerHTML because WP sometimes includes HTML entities in titles */}
                  <span dangerouslySetInnerHTML={{ __html: art.title?.rendered }} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}