import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleSignIn({ setlogin }) {
   const handleLoginSuccess = async (response) => {
      try {
         const { credential } = response;

         // POST the token to the backend
         const res = await axios.post('http://localhost:5000/api/users/registerG', { token: credential });

         // Save the returned JWT token and set login status
         const { token } = res.data;
         localStorage.setItem('token', token);
         setlogin(true);
      } catch (error) {
         console.error('Error during Google login:', error.message);
      }
   };

   const handleLoginFailure = (error) => {
      console.error('Google login failed:', error.message);
   };

   return (
      <div>
         <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
      </div>
   );
}

export default GoogleSignIn;
