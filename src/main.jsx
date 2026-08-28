import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // This applies your global base styles

// Import MUI's baseline to reset browser quirks
import { CssBaseline } from '@mui/material'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
);