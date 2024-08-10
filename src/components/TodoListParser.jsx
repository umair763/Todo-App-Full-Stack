import { useState } from 'react';
import './AllComponentsStyle.css';
import DisplayTodoList from './DisplayTodoList';

function TodoListParser({ todolist, searched }) {
    return (
        <>
            {searched !== null
                ? searched.map((list, i) => <DisplayTodoList list={list} key={i} id={i} />)
                : todolist.map((list, i) => <DisplayTodoList list={list} key={i} id={i} />)}
        </>
    );
}

export default TodoListParser;
