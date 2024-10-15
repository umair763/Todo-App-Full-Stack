import React, { useEffect, useState } from 'react';

function UserProfile({ setlogin }) {
   const [userDetails, setUserDetails] = useState({
      username: '',
      email: '',
      picture: null,
      gender: '',
      occupation: '',
      organization: '',
   });

   const [error, setError] = useState('');

   useEffect(() => {
      const fetchUserProfile = async () => {
         try {
            const token = localStorage.getItem('token');
            if (!token) {
               throw new Error('No token found, please log in.');
            }

            const response = await fetch('http://localhost:5000/api/users/profile', {
               headers: {
                  'Authorization': `Bearer ${token}`, // Correctly formatted Authorization header
               },
            });

            if (!response.ok) {
               const errorData = await response.json();
               console.error('Error fetching user profile:', errorData);
               throw new Error(errorData.message || 'Failed to fetch user profile');
            }

            const data = await response.json();
            setUserDetails(data);
         } catch (error) {
            setError('Error fetching user profile. Please try again.');
         }
      };

      fetchUserProfile();
   }, []);


   const handleLogout = () => {
      localStorage.removeItem('token'); // Clear token from localStorage
      setlogin(false); // Set login state to false
   };

   return (
      <>
         <div className="container mx-auto p-5 max-w-6xl">
            {/* Profile Picture Container */}
            <div className="flex justify-center mb-8">
               <div className="rounded-full bg-white p-2 shadow-md">
                  <img
                     src={`data:image/jpeg;base64,${userDetails.picture}`}
                     alt="Profile"
                     className="w-36 h-36 rounded-full object-cover"
                  />

                  {/* Display image from base64 */}
               </div>
            </div>

            {/* User Details Container */}
            <div className="bg-gray-100 p-6 rounded-xl shadow-lg">
               <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2">Name: {userDetails.username}</p>
               <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2">Email: {userDetails.email}</p>
               <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2">Gender: {userDetails.gender}</p>
               <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2">Occupation: {userDetails.occupation}</p>
               <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2">
                  Organization: {userDetails.organization}
               </p>

               {/* Logout Button */}
               <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4 transition-colors duration-300"
               >
                  Logout
               </button>
            </div>
         </div>
      </>
   );
}

export default UserProfile;
