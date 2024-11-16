import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
   <GoogleOAuthProvider clientId={googleClientId}>
      <App />
   </GoogleOAuthProvider>
);
