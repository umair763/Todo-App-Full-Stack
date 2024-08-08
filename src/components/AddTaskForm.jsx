import { useState } from "react";
import "./styles/AddTaskForm.css";

function AddTaskForm() {
	return (
		<>
			<form className="addtask-form">

				<labe>Choose color</labe>
				<select className="addentrysortby">
					<option>red</option>
					<option>yellow</option>
					<option>green</option>
				</select>

				<labe>Write task</labe>
				<input type="text" className="writeTask"/>

				<labe>Set time</labe>
				<input type="date" className="settime" />

				<button className="confirmbtn">Confirm</button>
			</form>
		</>
	);
}

export default AddTaskForm;
