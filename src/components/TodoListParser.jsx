import { useState } from 'react';
import './AllComponentsStyle.css';
import DisplayTodoList from './DisplayTodoList';

function TodoListParser({ todolist }) {
    return (
        <>
            {todolist.map((list, i) => (
                <DisplayTodoList list={list} key={i}/>
            ))}
        </>
    ); 
}

export default TodoListParser;
