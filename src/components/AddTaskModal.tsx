/*eslint-disable*/
'use client';

import { CloseIconSvg } from "@/lib/CloseIcon";
import { Priority, Task } from "./TaskList";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./AddTaskModal.module.css";

type Props = {
  closeModal: () => void;
  taskText: Task["name"];
  handleTaskChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleTaskSubmit: (e: FormEvent<HTMLFormElement>) => void;
  priority: Priority; // viene del padre
  handleTaskPriority: (priority: Task["priority"]) => () => void;
};

export const AddTaskModal = ({
  closeModal,
  taskText,
  handleTaskChange,
  handleTaskSubmit,
  priority,
  handleTaskPriority,
}: Props) => {
  // no necesitas estado local duplicado, usa el que viene del padre
  const selectedPriority = priority;

  const handleClickPriority = (p: Priority) => {
    handleTaskPriority(p)(); // actualiza prioridad en el padre
  };

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
          value={taskText}
        />
        <p>Priority</p>
        <ul className={styles.priorityList}>
          <li>
            <button
              type="button"
              className={`${styles.priorityHigh} ${
                selectedPriority === "High" ? styles.active : ""
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
                selectedPriority === "Medium" ? styles.active : ""
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
                selectedPriority === "Low" ? styles.active : ""
              }`}
              onClick={() => handleClickPriority("Low")}
            >
              Low
            </button>
          </li>
        </ul>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};


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