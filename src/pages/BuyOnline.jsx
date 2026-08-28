import React, { useState, useEffect } from 'react';
import Client from 'shopify-buy';
import { Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, CircularProgress, Box } from '@mui/material';

// Initialize the Shopify client
// Best practice: move the token and domain to your .env file later
const shopifyClient = Client.buildClient({
  domain: 'your-client-store-name.myshopify.com', 
  storefrontAccessToken: 'the_token_you_generated_in_step_1'
});

export default function BuyOnline() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products from her Shopify store
        const fetchedProducts = await shopifyClient.product.fetchAll();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching Shopify products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Shop Prints & Art
      </Typography>
      
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Render the first image of the product */}
              {product.images.length > 0 && (
                <CardMedia
                  component="img"
                  height="250"
                  image={product.images[0].src}
                  alt={product.title}
                  sx={{ objectFit: 'cover' }}
                />
              )}
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {product.title}
                </Typography>
                
                {/* Shopify stores prices on the "variants" (e.g., different sizes) */}
                <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                  ${product.variants[0].price.amount}
                </Typography>
                
                <Typography variant="body2" 
                            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
              </CardContent>
              
              <CardActions sx={{ p: 2, pt: 0 }}>
                {/* 
                  Instead of building a complex cart, we link directly to a Shopify-hosted checkout 
                  specifically for this single item. This is the "Buy Button" behavior.
                */}
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  onClick={async () => {
                    // Create a checkout session and redirect the user
                    const checkout = await shopifyClient.checkout.create();
                    const checkoutWithItem = await shopifyClient.checkout.addLineItems(checkout.id, [
                      {
                        variantId: product.variants[0].id,
                        quantity: 1
                      }
                    ]);
                    window.location.href = checkoutWithItem.webUrl;
                  }}
                >
                  Buy Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}