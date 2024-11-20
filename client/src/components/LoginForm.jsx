import { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Registeruser from './Registeruser';
import GoogleSignIn from './GoogleSignIn';

function LoginForm({ setlogin }) {
   const [showRegister, setShowRegister] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(true); // Add loading state
   const [isPasswordVisible, setPasswordVisible] = useState(false);

   const togglePasswordVisibility = () => {
      setPasswordVisible(!isPasswordVisible);
   };

   // Remove token when the page is closed
   useEffect(() => {
      const handleUnload = () => {
         localStorage.removeItem('token');
      };

      window.addEventListener('beforeunload', handleUnload);

      return () => {
         window.removeEventListener('beforeunload', handleUnload);
      };
   }, []);

   // Check for token in local storage on component mount and validate it
   useEffect(() => {
      const checkToken = async () => {
         const token = localStorage.getItem('token');
         if (token) {
            try {
               // Validate the token with the backend
               // const response = await fetch('http://localhost:5000/api/users/profile', {
               const response = await fetch('https://todo-app-full-stack-opal.vercel.app/api/users/profile', {
                  method: 'GET',
                  headers: {
                     'Content-Type': 'application/json',
                     Authorization: `Bearer ${token}`,
                  },
               });

               if (response.ok) {
                  setlogin(true); // Token is valid, log the user in
               } else {
                  localStorage.removeItem('token'); // Token is invalid, remove it
                  setlogin(false);
               }
            } catch (err) {
               setError('Error validating token. Please log in again.');
            }
         } else {
            setlogin(false); // No token found, user must log in
         }
         setLoading(false); // Stop loading after validation
      };

      checkToken();
   }, [setlogin]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');

      try {
         // const response = await fetch('http://localhost:5000/api/users/login', {
         const response = await fetch('https://todo-app-full-stack-opal.vercel.app/api/users/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
         });

         const data = await response.json();

         if (response.ok) {
            localStorage.setItem('token', data.token); // Save token in localStorage
            setlogin(true); // Update login state to true after successful login
         } else {
            setError(data.message || 'Login failed');
         }
      } catch (err) {
         setError('An error occurred during login.');
      }
   };

   if (loading) {
      return (
         <>
            <div className="min-h-screen w-full bg-gradient-to-br from-[#0172af] to-[#74febd] flex justify-center items-center">
               <div className="relative w-full h-[300px] flex items-center justify-center rounded-md overflow-hidden">
                  {/* Scan line */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/30 to-transparent animate-scan"></div>

                  {/* Glowing border */}
                  <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent rounded-md animate-glow"></div>

                  {/* Loading text */}
                  <div className="relative z-10 text-white text-lg font-semibold">Please wait...</div>
               </div>
            </div>
            <style jsx>
               {`
                  @layer utilities {
                     @keyframes scan {
                        0% {
                           transform: translateY(-100%);
                        }
                        100% {
                           transform: translateY(100%);
                        }
                     }

                     @keyframes glow {
                        0%,
                        100% {
                           box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
                        }
                        50% {
                           box-shadow: 0 10px 10px rgb(255, 255, 255);
                        }
                     }

                     .animate-scan {
                        animation: scan 2s infinite linear;
                     }

                     .animate-glow {
                        animation: glow 3s infinite ease-in-out;
                     }
                  }
               `}
            </style>
         </>
      );
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-[#0172af] to-[#74febd] flex justify-center items-center p-4">
         <div className="bg-gradient-to-br from-[#5d53e7] to-[#ea26fb] justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-xl font-caros-light text-gray-200 min-w-[250px] shadow-xl md:min-w-[400px]">
            {showRegister ? (
               <Registeruser />
            ) : (
               <>
                  <h2 className="text-center text-xl font-extrabold">Login form</h2>
                  <form onSubmit={handleSubmit}>
                     <div className="flex flex-col justify-center mb-2 font-bold">
                        <label className="pt-5 pb-3">User name</label>
                        <input
                           type="text"
                           required
                           className="border-b border-white bg-transparent text-white-100 font-caros-light focus:outline-none"
                        />
                     </div>
                     <div className="flex flex-col justify-center mb-2 font-bold">
                        <label className="pt-5 pb-3">Email</label>
                        <input
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                           className="border-b border-white bg-transparent text-white-100 font-caros-light focus:outline-none"
                        />
                     </div>
                     <div className="flex flex-col justify-center mb-2 font-bold">
                        <label className="pt-5 pb-3">Password</label>
                        <div className="relative">
                           <input
                              type={isPasswordVisible ? 'text' : 'password'}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="border-b border-white bg-transparent text-white-100 font-caros-light focus:outline-none pr-20"
                              style={{ width: '25rem' }} // Set a custom width using inline style
                           />
                           <div
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-white " // Adjusted the position of the text
                              onClick={togglePasswordVisibility}
                           >
                              {isPasswordVisible ? 'Hide' : 'Show'}
                           </div>
                        </div>
                     </div>

                     {error && <p className="text-black">{error}</p>}
                     <div className="flex flex-row gap-3">
                        <button
                           type="submit"
                           className="bg-[#9406e6] text-white rounded-lg p-2 px-6 font-bold hover:bg-[#8306ca] cursor-pointer mt-3"
                        >
                           Login
                        </button>
                        <button
                           type="button"
                           onClick={() => setShowRegister(true)}
                           className="bg-[#9406e6] text-white rounded-lg p-2 px-6 font-bold hover:bg-[#8306ca] cursor-pointer mt-3"
                        >
                           Register
                        </button>
                        <GoogleSignIn setlogin={setlogin} />
                     </div>
                  </form>
               </>
            )}
         </div>
      </div>
   );
}

export default LoginForm;
