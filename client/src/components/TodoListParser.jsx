import { useState } from 'react';
import './AllComponentsStyle.css';
import DisplayTodoList from './DisplayTodoList';
 
function TodoListParser({ todolist, searched }) {
    // Ensure both todolist and searched are arrays
    const validTodoList = Array.isArray(todolist) ? todolist : [];
    const validSearchedList = Array.isArray(searched) ? searched : [];

    // Check if searched is not empty or null
    const displayList = validSearchedList.length > 0 ? validSearchedList : validTodoList;

    return (
        <>
            {displayList.length > 0 ? (
                displayList.map((list, i) => <DisplayTodoList list={list} key={list._id || i} />)
            ) : (
                <p>No tasks available</p> // Show a message when no tasks are present
            )}
        </>
    );
}

export default TodoListParser;
