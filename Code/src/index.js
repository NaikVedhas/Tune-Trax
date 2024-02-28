import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ArtistProvider } from './context/artContext';
import { IndexProvider } from './context/indexContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <IndexProvider>
  <ArtistProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ArtistProvider></IndexProvider>
);

