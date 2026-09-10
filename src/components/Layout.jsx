import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Global Navigation Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
            9 Digit Designs
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={RouterLink} to="/">Home</Button>
            <Button color="inherit" component={RouterLink} to="/gallery">Gallery</Button>
            <Button color="inherit" component={RouterLink} to="/about">About</Button>
            <Button color="inherit" component={RouterLink} to="/contact">Contact</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Page Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 3, textAlign: 'center', bgcolor: 'grey.100', mt: 'auto' }}>
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} 9 Digit Designs by Tamara Maas. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}