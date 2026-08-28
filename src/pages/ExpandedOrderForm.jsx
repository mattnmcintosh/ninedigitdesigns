import React, { useState } from 'react';
import { 
  Typography, Box, Grid, Paper, TextField, Button, Alert, 
  MenuItem, Select, InputLabel, FormControl, Divider 
} from '@mui/material';

export default function ExpandedOrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderType: '',
    sizePreference: '',
    details: ''
  });
  
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "custom-order", ...formData })
    })
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', orderType: '', sizePreference: '', details: '' });
      })
      .catch((error) => {
        console.error(error);
        setStatus('error');
      });
  };

  return (
    <Box maxWidth="800px" mx="auto">
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="var(--text-heading, inherit)" align="center">
        Custom Order & Commission Form
      </Typography>
      
      <Typography variant="body1" align="center" paragraph sx={{ mb: 4, color: 'var(--text-muted, #666)' }}>
        Looking for a specific print size, a custom commission, or an original piece? Fill out the details below and I will get back to you with a quote and timeline.
      </Typography>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, bgcolor: 'var(--site-bg, #f5f5f5)', borderRadius: 2, border: '1px solid var(--border-light, #e0e0e0)' }}>
        
        {status === 'success' && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Thank you! Your custom order request has been sent. I will be in touch shortly.
          </Alert>
        )}

        {status === 'error' && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Oops! There was a problem sending your request. Please try again.
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            
            {/* Contact Information */}
            <Grid item xs={12}>
              <Typography variant="h6" color="var(--text-heading, inherit)">Contact Info</Typography>
              <Divider sx={{ my: 1 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField 
                required 
                fullWidth 
                variant="outlined"
                name="name" 
                label="Full Name" 
                value={formData.name} 
                onChange={handleChange} 
                sx={{ bgcolor: 'var(--content-bg, white)' }} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                required 
                fullWidth 
                variant="outlined"
                name="email" 
                label="Email Address" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                sx={{ bgcolor: 'var(--content-bg, white)' }} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                variant="outlined"
                name="phone" 
                label="Phone Number (Optional)" 
                value={formData.phone} 
                onChange={handleChange} 
                sx={{ bgcolor: 'var(--content-bg, white)' }} 
              />
            </Grid>

            {/* Order Details */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" color="var(--text-heading, inherit)">Order Details</Typography>
              <Divider sx={{ my: 1 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              {/* Added variant="outlined" here to fix the sizing */}
              <FormControl fullWidth required variant="outlined" sx={{ bgcolor: 'var(--content-bg, white)' }}>
                <InputLabel id="order-type-label">Type of Order</InputLabel>
                <Select 
                  labelId="order-type-label" 
                  name="orderType" 
                  value={formData.orderType} 
                  label="Type of Order" 
                  onChange={handleChange}
                >
                  <MenuItem value="Standard Print">Standard Print from Gallery</MenuItem>
                  <MenuItem value="Original Artwork">Purchase an Original Artwork</MenuItem>
                  <MenuItem value="Custom Commission">New Custom Commission</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              {/* Added variant="outlined" here as well */}
              <FormControl fullWidth variant="outlined" sx={{ bgcolor: 'var(--content-bg, white)' }}>
                <InputLabel id="size-label">Size Preference</InputLabel>
                <Select 
                  labelId="size-label" 
                  name="sizePreference" 
                  value={formData.sizePreference} 
                  label="Size Preference" 
                  onChange={handleChange}
                >
                  <MenuItem value="8x10">8 x 10"</MenuItem>
                  <MenuItem value="11x14">11 x 14"</MenuItem>
                  <MenuItem value="16x20">16 x 20"</MenuItem>
                  <MenuItem value="Unsure/Custom">Not Sure / Custom Size</MenuItem>
                  <MenuItem value="N/A">Not Applicable</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                name="details"
                label="Please describe which piece you want, or details for your commission..."
                multiline
                rows={5}
                value={formData.details}
                onChange={handleChange}
                sx={{ bgcolor: 'var(--content-bg, white)' }}
              />
            </Grid>
            
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" color="primary" size="large" fullWidth disableElevation sx={{ py: 1.5 }}>
                Submit Order Request
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}