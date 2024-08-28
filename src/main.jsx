import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.css';
import '../node_modules/izitoast/dist/css/izitoast.min.css';
import '../node_modules/izitoast/dist/js/izitoast.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
