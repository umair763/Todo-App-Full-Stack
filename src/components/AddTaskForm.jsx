import { useState } from 'react';
import './styles/AddTaskForm.css';

function AddTaskForm({ SetisAddFormVisible }) {
    function handleform(e) {
        e.preventDefault();
    }
    return (
        <>
            <form className="addtask-form" onSubmit={handleform}>
                <label>Choose color</label>
                <select className="addentrysortby">
                    <option>red</option>
                    <option>yellow</option>
                    <option>green</option>
                </select>

                <label>Write task</label>
                <input type="text" className="writeTask" />

                <label>Set Date</label>
                <input type="date" className="settime" />

                <label>Set time</label>
                <input type="time" className="settime" />

                <button className="confirmbtn">Confirm</button>
                <button className="closebtn" onClick={SetisAddFormVisible}>
                    Close
                </button>
            </form>
        </>
    );
}

export default AddTaskForm;
