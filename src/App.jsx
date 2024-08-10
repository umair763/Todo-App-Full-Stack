import { useState, useEffect } from 'react';
import './App.css';
import TodoListParser from './components/TodoListParser';
import AddTask from './components/AddTask';
import AddTaskForm from './components/AddTaskForm';
import DeleteTaskForm from './components/DeleteTaskForm';

function App() {
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [isDeleteFormVisible, setIsDeleteFormVisible] = useState(false);
    const [tasks, setTasks] = useState([]); // Initialize as an empty array
    const [sortby, setSortBy] = useState('sortby');
    const [searchtask, setSearchTask] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:5000/tasks');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Ensure data is an array
                if (Array.isArray(data)) {
                    setTasks(data);
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
    }, []);

    const handleisAddFormVisible = () => {
        setIsAddFormVisible((prev) => !prev);
        if (isDeleteFormVisible) setIsDeleteFormVisible(false);
    };

    const handleisDeleteFormVisible = () => {
        setIsDeleteFormVisible((prev) => !prev);
        if (isAddFormVisible) setIsAddFormVisible(false);
    };

    function handleAddNewTasks(task) {
        fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
            const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorMessage = await response.text(); // Get error message from the response
                throw new Error(`Failed to delete task: ${errorMessage}`);
            }

            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    let sorted = [...tasks]; // Ensure this is always an array
    if (sortby === 'Task') {
        sorted.sort((a, b) => a.task.localeCompare(b.task));
    } else if (sortby === 'time') {
        sorted.sort((a, b) => a.time.localeCompare(b.time));
    }

    let searched = sorted;
    if (searchtask) {
        searched = sorted.filter((el) => el.task.toLowerCase().includes(searchtask.toLowerCase()));
    }

    return (
        <>
            <div className="backgroundForm">
                <div className="grid">
                    <div className="div-1">
                        <div className="text">
                            <h1>Todo App</h1>
                            <h3>To-Do lists help us break life into small steps.</h3>
                        </div>
                        <AddTask
                            SetisAddFormVisible={handleisAddFormVisible}
                            setisDeleteFormVisible={handleisDeleteFormVisible}
                            setSort={setSortBy}
                            setSearch={setSearchTask}
                        />
                        <TodoListParser todolist={searched} /> {/* Pass searched directly */}
                    </div>

                    <div className="right-side">
                        {isAddFormVisible && (
                            <AddTaskForm addTask={handleAddNewTasks} SetisAddFormVisible={handleisAddFormVisible} />
                        )}
                        {isDeleteFormVisible && (
                            <DeleteTaskForm
                                deleteTask={handleDeleteTask}
                                setisDeleteFormVisible={handleisDeleteFormVisible}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
