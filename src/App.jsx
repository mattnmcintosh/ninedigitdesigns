import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import ArtClasses from './pages/ArtClasses';
import BuyOnline from './pages/BuyOnline';
import Store from './pages/Store';
import Blog from './pages/Blog';
import ExpandedOrderForm from "./pages/ExpandedOrderForm"

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/page" element={<Gallery />} />
          <Route path="/store" element={<Store />} />
          <Route path="/buy-online" element={<BuyOnline />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/art-classes" element={<ArtClasses />} />
          <Route path="/expanded-order-form" element={<ExpandedOrderForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}