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

   let sorted = [...tasks]; // Ensure this is always an array

   if (sortby === 'Task') {
      // Sort tasks alphabetically by task name
      sorted.sort((a, b) => a.task.localeCompare(b.task));
   } else if (sortby === 'time') {
      // Sort tasks by date and time in ascending order
      sorted.sort((a, b) => {
         // Compare dates first
         const dateA = convertToDateFormat(a.date); // Convert stored format
         const dateB = convertToDateFormat(b.date);

         // Split into [day, month, year]
         const [dayA, monthA, yearA] = dateA.split('/').map(Number);
         const [dayB, monthB, yearB] = dateB.split('/').map(Number);

         // Create Date objects to compare
         const fullDateA = new Date(yearA, monthA - 1, dayA); // JS months are 0-indexed
         const fullDateB = new Date(yearB, monthB - 1, dayB);

         // Compare by date
         if (fullDateA > fullDateB) return 1;
         if (fullDateA < fullDateB) return -1;

         // If dates are the same, compare time
         const timeA = convertTo12HourFormat(a.time); // 12-hour format
         const timeB = convertTo12HourFormat(b.time);

         return compare12HourTimes(timeA, timeB);
      });
   }

   // Function to compare two 12-hour formatted times
   function compare12HourTimes(timeA, timeB) {
      // Split time into [hours, minutes AM/PM]
      const [timeStrA, periodA] = timeA.split(' ');
      const [timeStrB, periodB] = timeB.split(' ');

      let [hoursA, minutesA] = timeStrA.split(':').map(Number);
      let [hoursB, minutesB] = timeStrB.split(':').map(Number);

      // Convert to 24-hour format based on AM/PM
      if (periodA === 'PM' && hoursA !== 12) hoursA += 12;
      if (periodA === 'AM' && hoursA === 12) hoursA = 0;

      if (periodB === 'PM' && hoursB !== 12) hoursB += 12;
      if (periodB === 'AM' && hoursB === 12) hoursB = 0;

      // Compare hours first
      if (hoursA > hoursB) return 1;
      if (hoursA < hoursB) return -1;

      // If hours are the same, compare minutes
      return minutesA - minutesB;
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
