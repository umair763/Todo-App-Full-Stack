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

   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');

   useEffect(() => {
      const fetchUserProfile = async () => {
         try {
            const token = localStorage.getItem('token');
            if (!token) {
               throw new Error('No token found');
            }

            const response = await fetch('http://localhost:5000/api/users/profile', {
               method: 'GET',
               headers: {
                  Authorization: `Bearer ${token}`, // Add token to Authorization header
                  'Content-Type': 'application/json',
               },
            });

            // Check if response is okay, otherwise handle the error
            if (!response.ok) {
               const errorData = await response.json();
               throw new Error(`Error fetching profile: ${errorData.message}`);
            }

            const data = await response.json(); // Parse the JSON response
            console.log('Profile data received:', data); // Log the response data

            // Set the received user details
            setUserDetails({
               username: data.username,
               email: data.email,
               picture: data.picture, // Base64-encoded picture
               gender: data.gender,
               occupation: data.occupation,
               organization: data.organization,
            });
         } catch (err) {
            setError(`Error fetching user profile: ${err.message}`);
            console.error(err); // Log error details for debugging
         } finally {
            setLoading(false); // Set loading to false after the fetch attempt
         }
      };

      fetchUserProfile();
   }, []);

   const handleLogout = () => {
      localStorage.removeItem('token');
      setlogin(false);
   };

   // Render loading state or error message if applicable
   if (loading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div>{error}</div>;
   }

   return (
      <div className="container mx-auto p-5 max-w-6xl">
         {/* Profile Picture Container */}
         <div className="flex justify-center mb-8">
            <div className="rounded-full bg-white p-2 shadow-md">
               {userDetails.picture ? (
                  <img
                     src={`data:image/jpeg;base64,${userDetails.picture}`} // Display base64 image
                     alt="Profile"
                     className="w-36 h-36 rounded-full object-cover"
                  />
               ) : (
                  <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center">No Image</div>
               )}
            </div>
         </div>

         {/* User Details Container */}
         <div className="bg-gray-100 p-6 rounded-xl shadow-lg">
            <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2">Name: {userDetails.username}</p>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2">Email: {userDetails.email}</p>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2">Gender: {userDetails.gender}</p>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2">Occupation: {userDetails.occupation}</p>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-2">Organization: {userDetails.organization}</p>

            {/* Logout Button */}
            <button
               onClick={handleLogout}
               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4 transition-colors duration-300"
            >
               Logout
            </button>
         </div>
      </div>
   );
}

export default UserProfile;
