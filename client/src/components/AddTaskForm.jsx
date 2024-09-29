import { useState } from 'react';
import './styles/AddTaskForm.css';
 
function AddTaskForm({ SetisAddFormVisible, addTask }) {
    const [color, setColor] = useState('');
    const [task, setTask] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
	
	function convertTo12HourFormat(time) {
        // Split the time into hours and minutes
        let [hours, minutes] = time.split(':');

        // Convert hours to a number
        hours = parseInt(hours);

        // Determine AM or PM suffix
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours from 24-hour format to 12-hour format
        hours = hours % 12 || 12;

        // Return the formatted time
        return `${hours}:${minutes} ${ampm}`;
    }


    function handleform(e) {
        e.preventDefault();

        const newTaskobj = {
            color,
            task,
            date,
            time,
            status: false,
        };
        console.log(newTaskobj);
        addTask(newTaskobj);
    }
    return (
        <>
            <form className="addtask-form" onSubmit={handleform}>
                <label>Choose color</label>
                <select className="addentrysortby" onChange={(e) => setColor(e.target.value)}>
                    <option>set color</option>
                    <option>red</option>
                    <option>yellow</option>
                    <option>green</option>
                </select>

                <label>Write task</label>
                <input type="text" className="writeTask" onChange={(e) => setTask(e.target.value)} />

                <label>Set Date</label>
                <input type="date" className="settime" onChange={(e) => setDate(e.target.value)} />

                <label>Set time</label>
                <input type="time" className="settime" onChange={(e) => setTime(convertTo12HourFormat(e.target.value))} />

                <button className="confirmbtn">Confirm</button>
                <button className="closebtn" onClick={SetisAddFormVisible}>
                    Close
                </button>
            </form>
        </>
    );
}

export default AddTaskForm;
