import { useState } from 'react';
// import './styles/LoginForm.css';
import Registeruser from './Registeruser';

function LoginForm({ setlogin }) {
   // Pass setlogin as a prop
   const [showRegister, setShowRegister] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');

      try {
         // const response = await fetch('http://localhost:5000/api/users/login', {
         const response = await fetch(
            'https://todo-app-full-stack-opal.vercel.app/api/users/login',
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ email, password }),
            }
         );

         const data = await response.json();

         if (response.ok) {
            localStorage.setItem('token', data.token);
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
         <div className="bg-gradient-to-br from-[#6157ff] to-[#ee49fd] justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg font-caros-light text-gray-200 min-w-[250px] shadow-lg md:min-w-[400px]">
            {showRegister ? (
               <Registeruser />
            ) : (
               <>
                  <h2 className="text-center text-xl font-extrabold">Login form</h2>
                  <form onSubmit={handleSubmit}>
                     <div className="flex flex-col justify-center mb-2 font-bold">
                        <label>User name</label>
                        <input
                           type="text"
                           required
                           className="rounded-md p-2 border border-black/60 bg-transparent text-gray-200 font-caros-light focus:outline-none"
                        />
                     </div>
                     <div className="flex flex-col justify-center mb-2 font-bold">
                        <label>Email</label>
                        <input
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                           className="rounded-md p-2 border border-black/60 bg-transparent text-gray-200 font-caros-light focus:outline-none"
                        />
                     </div>
                     <div className="flex flex-col justify-center mb-2 font-bold">
                        <label>Password</label>
                        <input
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                           className="rounded-md p-2 border border-black/60 bg-transparent font-caros-light focus:outline-none"
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
      </>
   );
}

export default LoginForm;
