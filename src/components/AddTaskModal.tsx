/*eslint-disable*/
'use client';

import { CloseIconSvg } from "@/lib/CloseIcon";
import { Priority, Task} from "./TaskList";
import { ChangeEvent, FormEvent } from "react";

type Props = {
    closeModal: () => void;
    taskText: Task["name"];
    handleTaskChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleTaskSubmit: (e: FormEvent<HTMLFormElement>) => void;
    priority: Priority;
    handleTaskPriority: (priority: Task["priority"]) => () => void;
}

export const AddTaskModal = ({closeModal, taskText, handleTaskChange, handleTaskSubmit, priority, handleTaskPriority}: Props) => {
    
    
    return (
        <div>
            <div>
                <h3>Add Task</h3>
                <button type="button" onClick={closeModal}>
                    <CloseIconSvg />
                </button>
            </div>
            <form onSubmit={handleTaskSubmit}>
                <p>Task</p>
                <input
                    type="text"
                    name="task"
                    onChange={handleTaskChange}
                    value={taskText} />
                <p>Priority</p>
                <ul>
                    <li><button type="button" onClick={handleTaskPriority("High")}>High</button></li>
                    <li><button type="button" onClick={handleTaskPriority("Medium")}>Medium</button></li>
                    <li><button type="button" onClick={handleTaskPriority("Low")}>Low</button></li>
                </ul>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

/*
<label htmlFor="high">High</label>
    <input
        type="radio"
        name="priority"
        id="high"
        checked={priority === "High"}
        value="High"
        onChange={handleTaskPriority} />
    <label htmlFor="medium">Medium</label>
    <input
        type="radio"
        name="priority"
        id="medium"
        checked={priority === "Medium"}
        value="Medium"
        onChange={handleTaskPriority} />
    <label htmlFor="low">Low</label>
    <input
        type="radio"
        name="priority"
        id="low"
        checked={priority === "Low"}
        value="Low"
        onChange={handleTaskPriority} />
</div>

*/