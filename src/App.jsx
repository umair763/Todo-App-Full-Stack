import { useState } from 'react';
import './App.css';
import TodoListParser from './components/TodoListParser';
import AddTask from './components/AddTask';
import AddTaskForm from './components/AddTaskForm';
import DeleteTaskForm from './components/DeleteTaskForm';

const todolist = [
    {
        color: 'red',
        task: 'Demo Task',
        date: '2024-8-21',
        time: '12:00 am',
        status: false,
    },
    {
        color: 'yellow',
        task: 'Demo',
        date: '2024-8-22',
        time: '11:00 am',
        status: false,
    },
    {
        color: 'green',
        task: 'Task',
        date: '2024-8-12',
        time: '04:00 am',
        status: false,
    },
    {
        color: 'green',
        task: 'Alpha',
        date: '2024-8-12',
        time: '04:00 am',
        status: false,
    },
];

function App() {
    const [isAddFormVisible, setisAddFormVisible] = useState(false);
    const [isDeleteFormVisible, setisDeleteFormVisible] = useState(false);
    const [newtask, setAddNewTask] = useState(todolist);
    const [sortby, setSortBy] = useState('sortby');
    const [searchtask, setSearchTask] = useState('');

    function handleisAddFormVisible() {
        setisAddFormVisible((x) => !x);
        isDeleteFormVisible ? setisDeleteFormVisible(false) : '';
        console.log(isAddFormVisible);
    }

    function handleisDeleteFormVisible() {
        setisDeleteFormVisible((x) => !x);
        isAddFormVisible ? setisAddFormVisible(false) : '';
        console.log(isDeleteFormVisible);
    }

    function handleAddNewTasks(task) {
        setAddNewTask((newtask) => [...newtask, task]);
    }

    function handleDeleteTask(task) {
        setAddNewTask(newtask.filter((el) => el.task !== task));
    }

    let sorted = [...newtask];
    if (sortby === 'Task') {
        sorted = sorted.slice().sort((a, b) => a.task.localeCompare(b.task));
    }

    if (sortby === 'time') {
        sorted = sorted.slice().sort((a, b) => a.time.localeCompare(b.time));
    }

    // Search tasks
    let searched = sorted;
    if (searchtask) {
        searched = sorted.filter((el) => el.task.toLowerCase().includes(searchtask.toLowerCase()));
    }
    console.log(searched);

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
                        <TodoListParser todolist={sorted} searched={searched} />
                    </div>

                    <div className="right-side">
                        {isAddFormVisible ? (
                            <AddTaskForm addTask={handleAddNewTasks} SetisAddFormVisible={handleisAddFormVisible} />
                        ) : (
                            ''
                        )}
                        {isDeleteFormVisible ? (
                            <DeleteTaskForm
                                deleteTask={handleDeleteTask}
                                setisDeleteFormVisible={handleisDeleteFormVisible}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
