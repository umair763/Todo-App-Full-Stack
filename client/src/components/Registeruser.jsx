import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';

function RegisterUser() {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [picture, setPicture] = useState('');

   const handleGoogleSuccess = (credentialResponse) => {
      const decodedToken = jwt_decode(credentialResponse.credential); // Decode token to extract user details
      setUsername(decodedToken.name);
      setEmail(decodedToken.email);
      setPicture(decodedToken.picture);
   };
 
   return (
      <GoogleOAuthProvider clientId="your-google-client-id">
         <div className="register-container">
            <h2>Register</h2>
            <form>
               <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
               />
               <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
               {picture && <img src={picture} alt="Profile" />}
            </form>
            <GoogleLogin
               onSuccess={handleGoogleSuccess}
               onError={() => {
                  console.error('Google Sign-In failed');
               }}
            />
         </div>
      </GoogleOAuthProvider>
   );
}

export default RegisterUser;
