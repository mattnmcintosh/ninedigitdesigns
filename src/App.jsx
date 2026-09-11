import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import './index.css';

// Lazy load pages for optimal bundle splitting
const Gallery = lazy(() => import('./pages/Gallery'));
const ArtClasses = lazy(() => import('./pages/ArtClasses'));
const Store = lazy(() => import('./pages/Store'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const ExpandedOrderForm = lazy(() => import('./pages/ExpandedOrderForm'));
const Layout = lazy(() => import('./components/Layout'));
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const FindMyArt = lazy(() => import('./pages/FindMyArt'));

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress />
          </Box>
        }>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="art-classes" element={<ArtClasses />} />
              <Route path="print-prices-and-sizes" element={<Store />} />
              <Route path="store" element={<Store />} />
              <Route path="blog" element={<Blog />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<About />} />
              <Route path="find-my-art" element={<FindMyArt />} />
              <Route path="expanded-order-form" element={<ExpandedOrderForm />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}