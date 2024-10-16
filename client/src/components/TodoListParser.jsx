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
               <NoTasksMessage />
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

const NoTasksMessage = () => {
   return (
      <div className="flex flex-col items-center justify-center h-full w-full mt-3">
         <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-white">No Tasks Available</h2>
            <p className="text-center text-gray-200 mt-2">
               It seems you haven't added any tasks yet. Get started by adding a new task!
            </p>
         </div>
      </div>
   );
};
