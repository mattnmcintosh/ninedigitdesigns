import React, { useState, useEffect } from 'react';
import { 
  Typography, Grid, Card, CardMedia, CardContent, 
  CircularProgress, Box, Dialog, DialogContent, CardActionArea 
} from '@mui/material';

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State to handle the expanded image modal (Lightbox)
  const [selectedArt, setSelectedArt] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        // Bumped to 24 items since the cards are smaller now
        const response = await fetch(
          'https://public-api.wordpress.com/wp/v2/sites/9digitdesigns.wordpress.com/media?per_page=96',
          {
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_WP_TOKEN}`
            }
          }
        );
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

  // Handlers for opening and closing the image modal
  const handleOpen = (art) => {
    setSelectedArt(art);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedArt(null);
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
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="var(--text-heading, inherit)">
        Gallery
      </Typography>
      
      {/* Grid changed to xs=6 (2 per row mobile) and md=3 (4 per row desktop) */}
      <Grid container spacing={2}>
        {artworks.map((art) => (
          <Grid item xs={6} sm={4} md={3} key={art.id}>
            <Card elevation={0} sx={{ border: '1px solid var(--border-light, #e0e0e0)' }}>
              {/* CardActionArea makes the entire card a clickable button */}
              <CardActionArea onClick={() => handleOpen(art)}>
                <CardMedia
                  component="img"
                  height="160"
                  // Uses a smaller WP thumbnail for the grid to keep load times fast
                  image={art.media_details?.sizes?.medium?.source_url || art.source_url} 
                  alt={art.title?.rendered || 'Artwork'} 
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ p: 1, pb: '8px !important' }}>
                  <Typography 
                    variant="body2" 
                    align="center" 
                    noWrap // Truncates long titles with an ellipsis so the grid doesn't break
                    dangerouslySetInnerHTML={{ __html: art.title?.rendered }} 
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* The pop-up modal for the expanded image */}
      <Dialog 
        open={modalOpen} 
        onClose={handleClose} 
        maxWidth="md" 
        fullWidth
      >
        {selectedArt && (
          <DialogContent sx={{ p: 0, bgcolor: 'var(--content-bg, #fff)' }}>
            {/* Loads the full-resolution image when expanded */}
            <img 
              src={selectedArt.source_url} 
              alt={selectedArt.title?.rendered || 'Artwork'} 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
            />
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" dangerouslySetInnerHTML={{ __html: selectedArt.title?.rendered }} />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Click anywhere outside the image to close.
              </Typography>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
}