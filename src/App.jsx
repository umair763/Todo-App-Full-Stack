import { useState } from 'react';
import './App.css';
import TodoListParser from './components/TodoListParser';
import AddTask from './components/AddTask';
  
const todolist = [
    {
        color: 'red',
        task: 'work out',
        time: 8,
        status: false,
    },
    {
        color: 'yellow',
        task: 'Design Team meeting',
        time: 2,
        status: false,
    },
    {
        color: 'green',
        task: 'coding',
        time: 7,
        status: true,
    },
    {
        color: 'green',
        task: 'coding',
        time: 3,
        status: true,
    },
];

function App() {
    return (
        <>
            <div className="backgroundForm">
                <div className="text">
                    <h1>Todo App</h1>
                    <h3>To-Do lists help us break life into small steps.</h3>
                </div>
                <AddTask />
                <TodoListParser todolist={todolist} />
            </div>
        </>
    );
}

export default App;

{
    /* {todolist.map((el, i) => {
                    <p>{el.color}</p>;
                    <p>{el.task}</p>;
                    <p>{el.time}</p>;
                    <p>{el.status}</p>;
                })} */
}
