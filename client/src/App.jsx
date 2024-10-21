import { useState, useEffect, useSyncExternalStore } from 'react';
// import './App.css';
import TodoListParser from './components/TodoListParser';
import AddTask from './components/AddTask';
import AddTaskForm from './components/AddTaskForm';
import DeleteTaskForm from './components/DeleteTaskForm';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';

function App() {
   const [isAddFormVisible, setIsAddFormVisible] = useState(false);
   const [isDeleteFormVisible, setIsDeleteFormVisible] = useState(false);
   const [tasks, setTasks] = useState([]); // Initialize as an empty array
   const [sortby, setSortBy] = useState('sortby');
   const [searchtask, setSearchTask] = useState('');
   const [islogin, setlogin] = useState(false);

   useEffect(() => {
      const fetchTasks = async () => {
         try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            if (!token) {
               throw new Error('No token found, please log in.');
            }

            // const response = await fetch('http://localhost:5000/api/tasks', {
            const response = await fetch('https://todo-app-full-stack-opal.vercel.app/api/tasks', {
               headers: {
                  Authorization: `Bearer ${token}`, // Ensure 'Bearer' is included
               },
            });

            if (!response.ok) {
               throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (Array.isArray(data)) {
               setTasks(data); // Set tasks only for the logged-in user
            } else {
               console.error('Expected an array, but got:', data);
               setTasks([]);
            }
         } catch (error) {
            console.error('Error fetching tasks:', error);
            setTasks([]); // Set to an empty array on error
         }
      };

      fetchTasks();
   }, [islogin]); // Fetch tasks whenever the login state changes

   const handleisAddFormVisible = () => {
      setIsAddFormVisible((prev) => !prev);
      if (isDeleteFormVisible) setIsDeleteFormVisible(false);
   };

   const handleisDeleteFormVisible = () => {
      setIsDeleteFormVisible((prev) => !prev);
      if (isAddFormVisible) setIsAddFormVisible(false);
   };

   function handleAddNewTasks(task) {
      // fetch('http://localhost:5000/api/tasks', {
      fetch('https://todo-app-full-stack-opal.vercel.app/api/tasks', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure correct format
         },
         body: JSON.stringify(task),
      })
         .then((res) => {
            if (!res.ok) {
               throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
         })
         .then((newTask) => setTasks([...tasks, newTask]))
         .catch((err) => console.error('Error adding task:', err));
   }

   const handleDeleteTask = async (taskId) => {
      try {
         // const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
         const response = await fetch(`https://todo-app-full-stack-opal.vercel.app/api/tasks/${taskId}`, {
            // Add `/tasks/` before taskId
            method: 'DELETE',
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });

         if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to delete task: ${errorMessage}`);
         }

         setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      } catch (error) {
         console.error('Error deleting task:', error);
      }
   };

   function convertTo24HourFormat(time) {
      const [timePart, modifier] = time.split(' '); // Split time and AM/PM
      let [hours, minutes] = timePart.split(':').map(Number);

      if (modifier === 'PM' && hours < 12) hours += 12; // Convert PM to 24-hour format
      if (modifier === 'AM' && hours === 12) hours = 0; // Convert 12 AM to 00 hours

      return { hours, minutes };
   }

   let sorted = [...tasks]; // Ensure this is always an array
   if (sortby === 'Task') {
      sorted.sort((a, b) => a.task.localeCompare(b.task));
   } else if (sortby === 'time') {
      // Sort by date first, then by time within those dates
      sorted.sort((a, b) => {
         // Convert date strings from 'DD/MM/YYYY' to 'YYYY-MM-DD' and create Date objects
         const dateA = new Date(a.date.split('/').reverse().join('-'));
         const dateB = new Date(b.date.split('/').reverse().join('-'));

         // Get the current date without time (compare only dates)
         const currentDate = new Date();
         const currentDateString = `${String(currentDate.getDate()).padStart(2, '0')}/${String(
            currentDate.getMonth() + 1
         ).padStart(2, '0')}/${currentDate.getFullYear()}`;
         const currentDateFormatted = new Date(currentDateString.split('/').reverse().join('-')); // Current date without time

         // Check if the dates have exceeded the current date
         const aExceeded = dateA < currentDateFormatted;
         const bExceeded = dateB < currentDateFormatted;

         // First, sort exceeded tasks on top
         if (aExceeded && !bExceeded) return -1;
         if (!aExceeded && bExceeded) return 1;

         // If both are either exceeded or both are upcoming, sort by date
         if (dateA < dateB) return -1;
         if (dateA > dateB) return 1;

         // If dates are the same, sort by time (12-hour format, no conversion needed)
         return compareTimes(a.time, b.time); // Compare directly using 12-hour logic
      });
   }

   // Function to compare two 12-hour times
   function compareTimes(timeA, timeB) {
      // Split the time and AM/PM part
      const [timePartA, modifierA] = timeA.split(' ');
      const [timePartB, modifierB] = timeB.split(' ');

      // If one is AM and the other is PM, AM comes first
      if (modifierA !== modifierB) {
         return modifierA === 'AM' ? -1 : 1;
      }

      // If both are the same (AM/AM or PM/PM), compare hours and minutes
      const [hourA, minuteA] = timePartA.split(':').map(Number);
      const [hourB, minuteB] = timePartB.split(':').map(Number);

      // Compare hours first
      if (hourA !== hourB) return hourA - hourB;

      // Compare minutes if hours are the same
      return minuteA - minuteB;
   }
   
   let searched = sorted;
   if (searchtask) {
      searched = sorted.filter((el) => el.task.toLowerCase().includes(searchtask.toLowerCase()));
   }

   return (
      <>
         {!islogin ? (
            <LoginForm setlogin={setlogin} />
         ) : (
            <div className="min-h-screen bg-gradient-to-br from-[#0172af] to-[#74febd] flex justify-center items-center p-4">
               <div className="w-full max-w-6xl p-5 rounded-xl shadow-lg bg-gradient-to-br from-[#9406E6] to-[#00FFFF] grid grid-cols-1 md:grid-cols-[1.5fr,1fr] lg:grid-cols-[1.5fr,1fr] gap-4">
                  <div className="div-1">
                     <div className="text">
                        <h1 className="text-4xl text-white font-extrabold mb-4">Todo App</h1>
                        <h3 className="text-xl text-white font-semibold mb-6">
                           To-Do lists help us break life into small steps.
                        </h3>
                     </div>
                     <AddTask
                        SetisAddFormVisible={handleisAddFormVisible}
                        setisDeleteFormVisible={handleisDeleteFormVisible}
                        setSort={setSortBy}
                        setSearch={setSearchTask}
                     />
                     <TodoListParser todolist={searched} />
                  </div>

                  <div className="right-side">
                     {isAddFormVisible && (
                        <AddTaskForm addTask={handleAddNewTasks} SetisAddFormVisible={handleisAddFormVisible} />
                     )}
                     {isDeleteFormVisible && (
                        <DeleteTaskForm
                           tasks={tasks}
                           deleteTask={handleDeleteTask}
                           setisDeleteFormVisible={handleisDeleteFormVisible}
                        />
                     )}
                     {!isAddFormVisible && !isDeleteFormVisible && <UserProfile setlogin={setlogin} />}
                  </div>
               </div>
            </div>
         )}
      </>
   );
}

export default App;
