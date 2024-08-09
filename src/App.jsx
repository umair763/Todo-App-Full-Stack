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
    const [isAddFormVisible, setisAddFormVisible] = useState(false);
    const [isDeleteFormVisible, setisDeleteFormVisible] = useState(false);

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
                        />
                        <TodoListParser todolist={todolist} />
                    </div>

                    <div className="right-side">
                        {isAddFormVisible ? <AddTaskForm SetisAddFormVisible={handleisAddFormVisible} /> : ''}
                        {isDeleteFormVisible ? <DeleteTaskForm setisDeleteFormVisible={handleisDeleteFormVisible} /> : ''}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
