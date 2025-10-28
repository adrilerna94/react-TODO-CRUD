/*eslint-disable*/

import { useState } from "react";

type Task = {
    id: number;
    name: string;
    status: "pending" | "done" | "in process";
    priority: "medium" | "high" | "low";
};

type TaskList = Task [];

export function TaskList () {
    const [taskList, setTaskList] = useState<TaskList>([{
        id: 1,
        name: "Ir a comprar",
        status: "pending",
        priority: "medium",
    }]);

    return (
        <section>
            <ul>
                {taskList.length > 0 && taskList.map((task) => (
                    <li key={task.id}>
                        <p><strong>{task.name}</strong></p>
                        <p>{task.priority}</p>
                        <p>{task.status}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}