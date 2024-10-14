import { useState } from 'react';
// import './styles/DisplayTodoList.css';

function DisplayTodoList({ list }) {
   const [marked, setMarked] = useState(false);

   function handlemarked() {
      setMarked((show) => !show);
   }

   return (
      <>
         <div className="scrollableDiv">
            <div className="listbar grid grid-cols-[30px,fr,1fr] w-full px-4 py-2 mb-2 font-caros-light rounded-lg text-[#1D1D1D] bg-[#C8F0F3]/90  items-center">
               <input
                  type="radio"
                  className={`${
                     list.color === 'red'
                        ? 'w-4 h-4  rounded-full cursor-pointer appearance-none bg-red-600 border-red-600'
                        : list.color === 'yellow'
                        ? 'w-4 h-4  rounded-full cursor-pointer appearance-none bg-yellow-400 border-yellow-400'
                        : 'w-4 h-4  rounded-full cursor-pointer appearance-none bg-green-600 border-green-600'
                  }`}
               />

               <p
                  className={`time ${
                     marked ? 'line-through' : ''
                  } font-bold text-left sm:text-base font-caros-light lg:text-md`}
               >
                  {list.task}
               </p>
               <div className="time flex justify-between items-center">
                  <p
                     className={`${
                        marked ? 'line-through' : ''
                     } font-bold gap-2 text-left sm:text-base font-caros-light lg:text-md`}
                  >
                     {list.date}
                  </p>
                  <p
                     className={`${
                        marked ? 'line-through' : ''
                     } font-bold text-left sm:text-base font-caros-light lg:text-md`}
                  >
                     {list.time}
                  </p>
                  <input
                     type="checkbox"
                     className="checkbox w-4 h-4 rounded-full border-2 border-indigo-600 cursor-pointer appearance-none checked:bg-[#573fff] checked:border-[#573fff] relative"
                     onClick={handlemarked}
                  />
               </div>
            </div>
         </div>

         <style jsx>{`
            @media screen and (max-width: 300px) {
               .listbar {
                  grid-template-columns: 20px 1fr 1fr;
                  font-size: 9px !important;
               }

               .checkbox:checked::before {
                  content: '✓';
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  color: white;
                  font-size: 12px;
                  opacity: 0.7;
               }
            }

            @media screen and (min-width: 301px) and (max-width: 340px) {
               .listbar {
                  grid-template-columns: 22px 1fr 1fr;
                  font-size: 10px !important;
               }

               .checkbox:checked::before {
                  content: '✓';
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  color: white;
                  font-size: 10px;
                  opacity: 0.7;
               }
            }

            @media screen and (min-width: 341px) and (max-width: 600px) {
               .listbar {
                  grid-template-columns: 25px 1fr 1fr;
                  font-size: 11px !important;
               }

               .checkbox:checked::before {
                  content: '✓';
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  color: white;
                  font-size: 16px;
                  opacity: 0.7;
               }
            }

            @media screen and (min-width: 601px) {
               .listbar {
                  grid-template-columns: 28px 1fr 1fr;
                  font-size: 12px !important;
               }

               .checkbox:checked::before {
                  content: '✓';
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  color: white;
                  font-size: 18px;
                  opacity: 0.7;
               }
            }

            // .scrollableDiv {
            //    height: 50vh;
            //    overflow-y: auto;
            //    margin-right: 5px;
            // }
            .scrollableDiv::-webkit-scrollbar {
               width: 12px;
            }
            .scrollableDiv::-webkit-scrollbar-thumb {
               background: rgba(5, 103, 189, 0.782);
               border-radius: 10px;
            }
            .scrollableDiv::-webkit-scrollbar-thumb:hover {
               background: rgba(3, 90, 166, 0.782);
            }
            .scrollableDiv::-webkit-scrollbar-track {
               background: rgb(133, 198, 255);
               border-radius: 10px;
            }
         `}</style>
      </>
   );
}

export default DisplayTodoList;
