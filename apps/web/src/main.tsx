import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      toastOptions={{
        className: 'bg-zinc-800 text-white text-sm',
        duration: 4000,
      }}
    />
    <App />
  </React.StrictMode>,
);
