/*eslint-disable*/
'use client';

import {Priority, Task} from "./TaskList";

type Props = {
    task: Task;
    handleTaskChange: () => void;
    handleTaskSubmit: () => void;
    priority: Priority;
    handleTaskPriority: () => void;
}

export const AddTaskModal = ({task, handleTaskChange, handleTaskSubmit, priority, handleTaskPriority}: Props) => {
    return (
        <div>
            <h3>Add Task</h3>
            <form onSubmit={handleTaskSubmit}>
                <p>Task</p>
                <input
                    type="text"
                    name= "task"
                    onChange={handleTaskChange}
                    value={task.name} 
                />
                <p>Priority</p>
                <input 
                    type="radio"
                    name="priority"
                    checked= {priority === "High"}
                    value= "High"
                    onChange={handleTaskPriority}
                />
                <input 
                    type="radio"
                    name="priority"
                    checked= {priority === "Medium"}
                    value= "Medium"
                    onChange={handleTaskPriority}
                />
                <input 
                    type="radio"
                    name="priority"
                    checked= {priority === "Low"}
                    value= "Low"
                    onChange={handleTaskPriority}
                />
            </form>
            
        </div>
    )
}
