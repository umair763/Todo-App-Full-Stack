import { useState, useEffect } from 'react';
import Registeruser from './Registeruser';

function LoginForm({ setlogin }) {
   const [showRegister, setShowRegister] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');

   // Function to validate token with server
   const validateToken = async (token) => {
      try {
         const response = await fetch('https://todo-app-full-stack-opal.vercel.app/api/users/profile', {
            method: 'GET',
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         if (response.ok) {
            const data = await response.json();
            console.log('User profile fetched:', data); // Debugging
            setlogin(true); // If profile fetch is successful, log the user in
         } else {
            // Token is invalid or expired, remove it from localStorage
            localStorage.removeItem('token');
            setlogin(false); // Ensure user is not logged in
         }
      } catch (error) {
         console.error('Error validating token:', error);
         localStorage.removeItem('token'); // Clean up token if there's an error
         setlogin(false);
      }
   };

   // Check for token in local storage and validate it
   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
         validateToken(token); // Validate token with the server
      } else {
         setlogin(false); // No token, so no login
      }
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

   return (
      <>
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
                           <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="border-b border-white bg-transparent text-white-100 font-caros-light focus:outline-none"
                           />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
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
                        </div>
                     </form>
                  </>
               )}
            </div>
         </div>
      </>
   );
}

export default LoginForm;
