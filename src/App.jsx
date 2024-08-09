import { useState } from 'react';
import './App.css';
import TodoListParser from './components/TodoListParser';
import AddTask from './components/AddTask';
import AddTaskForm from './components/AddTaskForm';
import DeleteTaskForm from './components/DeleteTaskForm';

const todolist = [
    {
        color: 'red',
        task: 'work out',
        date: '13/01/2024',
        time: '12:00',
        status: false,
    },
    {
        color: 'yellow',
        task: 'Design Team meeting',
        date: '28/02/2024',
        time: '11:00',
        status: false,
    },
    {
        color: 'green',
        task: 'coding',
        date: '18/03/2024',
        time: '10:00',
        status: true,
    },
    {
        color: 'green',
        task: 'coding',
        date: '08/04/2024',
        time: '02:00',
        status: true,
    },
];

function App() {
    const [addTaskbtn, setAddTaskbtn] = useState(false);
    const [DeleteTaskbtn, setDeleteTaskbtn] = useState(false);

    function handleAddTaskbtn() {
        setAddTaskbtn((x) => !x);
        addTaskbtn ? setAddTaskbtn(false) : '';
        console.log(addTaskbtn);
    }

    function handleDeleteTaskbtn() {
        setDeleteTaskbtn((x) => !x);
        DeleteTaskbtn ? setDeleteTaskbtn(false) : '';
        console.log(DeleteTaskbtn);
    }

    function handlesetAddFalse() {
        setAddTaskbtn(false);
    }

    function handlesetDeleteFalse() {
        setDeleteTaskbtn(false);
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
                        <AddTask SetAddTaskbtn={handleAddTaskbtn} setDeleteTaskbtn={handleDeleteTaskbtn} />
                        <TodoListParser todolist={todolist} />
                    </div>

                    <div className="right-side">
                        {addTaskbtn ? <AddTaskForm /> : ''}
                        {DeleteTaskbtn ? <DeleteTaskForm /> : ''}
                        {/* <AddTaskForm /> */}
                        {/* <DeleteTaskForm /> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
