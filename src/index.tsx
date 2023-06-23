import React from 'react';
import ReactDOM from 'react-dom/client';
import "swiper/css";
import "swiper/css/pagination";
import './assets/styles/style.scss';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
