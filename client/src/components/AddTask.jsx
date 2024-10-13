import { useState } from 'react';
// import './styles/AddTask.css';

function AddTask({ SetisAddFormVisible, setisDeleteFormVisible, setSort, setSearch }) {
   return (
      <>
         {/* Add Task Container */}
         <div className="Addtaskcontainer grid grid-cols-[80px,2fr,1fr] gap-1 items-center px-2 py-1 w-full bg-[#C8F0F3]/90 rounded-md ">
            <p className="col-span-1 text-center text-base md:text-lg sm:text-base">🔴🟡🟢</p>

            <input
               type="search"
               className="searchbar col-span-1 text-xs md:text-sm bg-transparent outline-none placeholder:text-gray-400 w-full"
               placeholder="Search..."
               onChange={(e) => setSearch(e.target.value)}
            />

            <select
               className="sortby col-span-1 h-8 text-xs md:text-sm bg-[#C8F0F3]/90 border-2 border-[#19D9E7]/90 rounded-md ml-2"
               onChange={(e) => setSort(e.target.value)}
            >
               <option>Sort by</option>
               <option>Task</option>
               <option>Time</option>
            </select>
         </div>

         {/* Button Container */}
         <div className="buttons flex justify-end px-2 py-1 mt-1 w-full">
            <button
               className="addbtn px-3 py-1 mr-2 bg-gradient-to-r from-[#56ccf2] to-[#2f80ed] text-white rounded-md shadow-md font-bold text-xs md:text-sm"
               onClick={SetisAddFormVisible}
            >
               Add Task
            </button>

            <button
               className="deletebtn px-3 py-1 bg-gradient-to-r from-[#f093fb] to-[#f5576c] text-white rounded-md shadow-md font-bold text-xs md:text-sm"
               onClick={setisDeleteFormVisible}
            >
               Delete Task
            </button>
         </div>

         <style jsx>{`
            @media (max-width: 350px) {
               .Addtaskcontainer {
                  grid-template-columns: 40px 1fr 1fr; /* Adjust column layout */
               }

               .sortby {
                  margin-left: 0; /* Remove margin on smaller screens */
               }
            }

            @media (max-width: 350px) {
               .Addtaskcontainer {
                  grid-template-columns: 1fr; /* Stack elements vertically */
                  text-align: center; /* Center text on very small screens */
               }

               .searchbar,
               .sortby {
                  width: 100%; /* Ensure full width for inputs */
               }
            }
         `}</style>
      </>
   );
}

export default AddTask;
