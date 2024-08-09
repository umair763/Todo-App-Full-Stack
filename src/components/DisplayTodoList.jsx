import { useState } from "react";
import "./styles/DisplayTodoList.css";

function DisplayTodoList({ list }) {
	const [marked, setMarked] = useState(false);

	function handlemarked() {
		setMarked((show) => !show);
	}

	return (
		<>
			<div className="listbar">
				<input
					type="radio"
					className={`${
						list.color === "red" ? "radiored" : list.color === "yellow" ? "radioyellow" : "radiogreen"
					}`}
				/>
				<p className={`time ${marked ? "strikethough" : ""}`}>{list.task}</p>
				<div className="time">
					<p className={`${marked ? "strikethough" : ""} timendateGap`}>{list.date}</p>
					<p className={`${marked ? "strikethough" : ""}`}>{list.time}</p>
					<input
						type="checkbox"
						className="checkbox"
						onClick={handlemarked}
					/>
				</div>
			</div>
		</>
	);
}

export default DisplayTodoList;
