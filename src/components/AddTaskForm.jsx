import { useState } from "react";
import "./AllComponentsStyle.css";

function AddTaskForm() {
	return (
		<>
			<div className="addtask-form">
				<div className="form-design">

					<labe>Choose color</labe>
					<select>
						<option>red</option>
						<option>yellow</option>
						<option>green</option>
					</select>

					<labe>Write task</labe>
					<input type="text" />

					<labe>Set time</labe>
					<input type="date" />
				</div>
			</div>
		</>
	);
}

export default AddTaskForm;
