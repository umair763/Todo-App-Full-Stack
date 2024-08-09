import { useState } from 'react';
import './styles/DeleteTaskForm.css';

function DeleteTaskForm({ setisDeleteFormVisible }) {
    function handleform(e) {
        e.preventDefault();
    }

    return (
        <>
            <form className="addtask-form2" onSubmit={handleform}>
                <label>Enter color</label>
                <select className="addentrysortby2">
                    <option>red</option>
                    <option>yellow</option>
                    <option>green</option>
                </select>

                <label>Enter task</label>
                <input type="text" className="writeTask2" />

                <label>Enter Date</label>
                <input type="date" className="settime2" />

                <label>Enter time</label>
                <input type="time" className="settime2" />

                <button className="confirmbtn2">Confirm</button>
                <button className="closebtnn" onClick={setisDeleteFormVisible}>
                    Close
                </button>
            </form>
        </>
    );
}

export default DeleteTaskForm;
