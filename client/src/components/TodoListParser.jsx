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
         {' '}
         <div className="scrollableContainer">
            {displayList.length > 0 ? (
               displayList.map((list, i) => <DisplayTodoList list={list} key={list._id || i} />)
            ) : (
               <p>No tasks available</p> // Show a message when no tasks are present
            )}
         </div>

         <style jsx>{`
            .scrollableContainer {
               max-height: 45vh; /* Set height for the container, not tasks */
               overflow-y: auto; /* Enable scrolling for overflowing content */
            }

            .scrollableContainer::-webkit-scrollbar {
               width: 10px;
               margin-left: 2px;
            }
            .scrollableContainer::-webkit-scrollbar-thumb {
               background: rgba(5, 103, 189, 0.782);
               border-radius: 10px;
            }
            .scrollableContainer::-webkit-scrollbar-thumb:hover {
               background: rgba(3, 90, 166, 0.782);
            }
            .scrollableContainer::-webkit-scrollbar-track {
               background: rgb(133, 198, 255);
               border-radius: 10px;
            }
         `}</style>
      </>
   );
}

export default TodoListParser;
