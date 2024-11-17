import React from 'react';
<<<<<<< Updated upstream
import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
=======
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
>>>>>>> Stashed changes


const CLIENT_ID = '726557724768-qplqm3h12oea644a7pqmnvf26umqssfr.apps.googleusercontent.com';
ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
<<<<<<< Updated upstream
      <GoogleOAuthProvider clientId={googleClientId}>
=======
      <GoogleOAuthProvider clientId={CLIENT_ID}>
>>>>>>> Stashed changes
         <App />
      </GoogleOAuthProvider>
   </React.StrictMode>
);
