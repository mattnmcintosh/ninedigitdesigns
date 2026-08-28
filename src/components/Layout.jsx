import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button, Grid, Paper } from '@mui/material';

export default function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ flexDirection: 'column', py: 2 }}>
          <Typography variant="h3" component="h1" fontWeight="bold">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              9 Digit Designs
            </Link>
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Real Art from the Heart
          </Typography>
          
          {/* Navigation Menu */}
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            <Button component={Link} to="/">Home</Button>
            <Button component={Link} to="/about">About Me</Button>
            <Button component={Link} to="/page">Gallery</Button>
            <Button component={Link} to="/store">Print Prices</Button>
            <Button component={Link} to="/contact">Contact</Button>
            <Button component={Link} to="/blog">Blog</Button>
            <Button component={Link} to="/art-classes">Art Classes</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content & Sidebar Area */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Grid container spacing={4}>
          {/* Page Content */}
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 3, minHeight: '50vh' }}>
              {children}
            </Paper>
          </Grid>
          
          {/* Sidebar (Replicating her current widgets) */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, bgcolor: '#f9f9f9' }}>
              <Typography variant="h6" gutterBottom>Welcome</Typography>
              <Typography variant="body2" paragraph>
                <strong>Special Thanks are extended to:</strong><br />
                The Hope Lodge<br />
                The Cleveland Clinic<br />
                My friends, family, and my customers<br />
                Thank You
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>About this site</Typography>
              <Typography variant="body2">
                This website features many of my art works in the gallery. There is also information available about art classes.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}