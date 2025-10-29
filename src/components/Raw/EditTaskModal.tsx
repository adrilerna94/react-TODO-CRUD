/*eslint-disable*/
'use client';

import { CloseIconSvg } from "@/lib/CloseIcon";
import { Priority, Task } from "./TaskList";
import { ChangeEvent, FormEvent } from "react";
import styles from "./AddTaskModal.module.css";

type Props = {
  selectedTask: Task;
  closeModal: () => void;
  taskText: Task["name"];
  handleTaskChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTaskSubmit: (e: FormEvent<HTMLFormElement>) => void;
  priority: Priority; // viene del padre
  handleTaskPriority: (priority: Task["priority"]) => () => void;
};

export const EditTaskModal = ({
  selectedTask,
  closeModal,
  taskText,
  handleTaskChange,
  handleTaskSubmit,
  priority,
  handleTaskPriority,
}: Props) => {
  // no necesitas estado local duplicado, usa el que viene del padre
  const handleClickPriority = (p: Priority) => {
    handleTaskPriority(p)(); // actualiza prioridad en el padre
  };

  return (
    <div>
      <div>
        <h3>Edit Task</h3>
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
          value={selectedTask.name}
        />
        <p>Priority</p>
        <ul className={styles.priorityList}>
          <li>
            <button
              type="button"
              className={`${styles.priorityHigh} ${
                priority === "High" ? styles.active : ""
              }`}
              onClick={() => handleClickPriority("High")}
            >
              High
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`${styles.priorityMedium} ${
                priority === "Medium" ? styles.active : ""
              }`}
              onClick={() => handleClickPriority("Medium")}
            >
              Medium
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`${styles.priorityLow} ${
                priority === "Low" ? styles.active : ""
              }`}
              onClick={() => handleClickPriority("Low")}
            >
              Low
            </button>
          </li>
        </ul>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};