/*eslint-disable*/
'use client';

import { useState } from "react";
import styles from "./TaskList.module.css";
import { DeleteIconSvg } from "@/lib/DeleteIcon";
import { EditIconSvg } from "@/lib/EditIcon";
import { PlusIconSvg } from "@/lib/PlusIcon";


export type Status = "Pending" | "Done" | "In Progress";
export type Priority = "Medium" | "High" | "Low";

export interface Task {
    id: number;
    name: string;
    status: Status;
    priority: Priority;
};

type TaskList = Task [];

export function TaskList () {
    const [taskList, setTaskList] = useState<TaskList>([
        {
            id: 1,
            name: "Ir a comprar",
            status: "Pending",
            priority: "Medium",
        },
        {
            id: 2,
            name: "Lavar la ropa",
            status: "In Progress",
            priority: "High",
        },
        {
            id: 3,
            name: "Daygame con Tito",
            status: "Pending",
            priority: "High",
        },
    
    ]);


    const addTask = (task: Task) => {
        setTaskList((prevTasks: TaskList) => 
            [
                ...prevTasks, 
                {
                    id: prevTasks.length + 1,
                    name: task.name,
                    status: task.status,
                    priority: task.priority,
                }
            ]
        );
    }


    return (
        <section className={styles.taskSection}>
            <h2>TASK LIST</h2>
            <button type="button" className={styles.plusButtonContainer}>
                <div>
                    <PlusIconSvg />
                    <p>Add Task</p>
                </div>
            </button>
            <ul className={styles.taskList}>
                {taskList.length > 0 && taskList.map((task: Task) => (
                    <li className= {styles.task} key={task.id}>
                        <div className= {styles.taskDiv}>
                           <p>Task</p>
                           <p><strong>{task.name}</strong></p> 
                        </div>
                        <div className= {styles.taskDiv}>
                            <p>Priority</p>
                            <p><strong>{task.priority}</strong></p> 
                        </div>
                        <div className={styles.status}>
                            <p>{task.status}</p>
                        </div>
                        <button className={styles.actionButtons} type="button">
                            <EditIconSvg/>
                        </button>
                        <button className={styles.actionButtons} type="button">
                            <DeleteIconSvg />
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    )
}