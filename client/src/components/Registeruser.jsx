import { useState } from 'react';
// import './styles/Registeruser.css';
import LoginForm from './LoginForm';

function Registeruser() {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');

      try {
         // const response = await fetch(' http://localhost:5000/api/users/register ', {
         const response = await fetch('https://todo-app-full-stack-opal.vercel.app/api/users/register ', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
         });

         const data = await response.json();

         if (response.ok) {
            setSuccess('Registration successful!');
            // Redirect to login
            setTimeout(() => (window.location.href = '/'), 2000);
         } else {
            setError(data.message || 'Registration failed');
         }
      } catch (err) {
         setError('An error occurred. Please try again.');
      }
   };

   return (
      <>
         <div className="bg-gradient-to-br from-[#0700DE] to-[#c4faa5] justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg font-caros-light text-gray-200 min-w-[250px] shadow-lg md:min-w-[400px]">
            <h2 className="text-center text-xl font-extrabold">Register</h2>
            <form onSubmit={handleSubmit}>
               <div className="flex flex-col justify-center mb-2 font-bold">
                  <label className="pt-5 pb-3">Username</label>
                  <input
                     type="text"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
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
               {success && <p className="text-green-500">{success}</p>}

               <div className="flex flex-row gap-3 mt-6 ">
                  <button
                     type="submit"
                     className="bg-[#9406e6] text-white rounded-lg p-2 px-6 font-bold hover:bg-[#8306ca] cursor-pointer"
                  >
                     Register
                  </button>
               </div>
            </form>
         </div>
      </>
   );
}

export default Registeruser;
