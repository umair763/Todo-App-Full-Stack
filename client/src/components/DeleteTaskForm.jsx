import { useState } from 'react';
import './styles/DeleteTaskForm.css';

function DeleteTaskForm({ tasks, setisDeleteFormVisible, deleteTask }) {
    const [selectedTaskId, setSelectedTaskId] = useState(''); // Track the selected task ID

    function handleform(e) {
        e.preventDefault();
        if (selectedTaskId) {
            deleteTask(selectedTaskId); // Pass the task's MongoDB _id to the delete function
            setSelectedTaskId('');
        } else {
            console.error('No task selected for deletion.');
        }
    }

    return (
        <>
            <form className="addtask-form2" onSubmit={handleform}>
                <label>Select Task</label>
                <select
                    className="addentrysortby2"
                    onChange={(e) => setSelectedTaskId(e.target.value)} // Capture the _id of the selected task
                    value={selectedTaskId}
                >
                    <option value="">Select a task</option>
                    {tasks.map((task) => (
                        <option key={task._id} value={task._id}>
                            {task.task} ({task.date})
                        </option>
                    ))}
                </select>

                <button className="confirmbtn2" type="submit">
                    Confirm
                </button>
                <button className="closebtnn" onClick={setisDeleteFormVisible}>
                    Close
                </button>
            </form>
        </>
    );
}

export default DeleteTaskForm;
