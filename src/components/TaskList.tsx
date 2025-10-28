"use client";

import {useState} from "react";

import styles from "./TaskList.module.css";
import {AddTaskModal} from "./AddTaskModal";

import {DeleteIconSvg} from "@/lib/DeleteIcon";
import {EditIconSvg} from "@/lib/EditIcon";
import {PlusIconSvg} from "@/lib/PlusIcon";

export type Status = "To Do" | "Done" | "In Progress";
export type Priority = "Medium" | "High" | "Low";

export interface Task {
  id: number;
  name: string;
  status: Status;
  priority: Priority;
}

type TaskList = Task[];

export function TaskList() {
  const [taskList, setTaskList] = useState<TaskList>([
    {
      id: 1,
      name: "Ir a comprar",
      status: "To Do",
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
      status: "To Do",
      priority: "High",
    },
  ]);
  //   const [newTask, setNewTask] = useState<Omit<Task, "id">>({
  //     name: "",
  //     status: "To Do",
  //     priority: "Medium",
  //   });

  const [inputText, setInputText] = useState<Task["name"]>("");
  const [inputPriority, setInputPriority] = useState<Priority>("High");
  const [isAddModalOpen, setToggleAddModal] = useState<boolean>(false);

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    setInputText(text);
  };
  const handleTaskPriority = (newPriority: Task["priority"]) => {
    return () => setInputPriority((prev) => (prev !== newPriority ? newPriority : prev));
  };

  //   const addTask = (task: Omit<Task, "id">) => {
  //     setNewTask({
  //       name: inputText,
  //       priority: inputPriority,
  //       status: task.status, // "To Do" por defecto
  //     });
  //   };

  const handleTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText !== "") {
      const task: Omit<Task, "id"> = {
        name: inputText,
        priority: inputPriority,
        status: "To Do", // por defecto
      };

      //   addTask(task);
      addToTaskList(task);
    }
  };

  const addToTaskList = (task: Omit<Task, "id">) => {
    setTaskList((prevTasks: TaskList) => [
      ...prevTasks,
      {
        id: prevTasks.length + 1,
        name: task.name,
        status: task.status,
        priority: task.priority,
      },
    ]);
  };

  const openModal = () => setToggleAddModal(true);
  const closeModal = () => setToggleAddModal(false);
  const deleteTask = (id: Task["id"]) => {
    return () => setTaskList((taskList) => taskList.filter((task) => task.id !== id));
  };

  return (
    <section className={styles.taskSection}>
      <h2>TASK LIST</h2>
      <button className={styles.plusButtonContainer} type="button" onClick={openModal}>
        <div>
          <PlusIconSvg />
          <p>Add Task</p>
        </div>
      </button>
      {isAddModalOpen && (
        <AddTaskModal
          closeModal={closeModal}
          handleTaskChange={handleTaskChange}
          handleTaskPriority={handleTaskPriority}
          handleTaskSubmit={handleTaskSubmit}
          priority={inputPriority}
          taskText={inputText}
        />
      )}
      <ul className={styles.taskList}>
        {taskList.length > 0 &&
          taskList.map((task: Task) => (
            <li key={task.id} className={styles.task}>
              <div className={styles.taskDiv}>
                <p>Task</p>
                <p>
                  <strong>{task.name}</strong>
                </p>
              </div>
              <div className={styles.taskDiv}>
                <p>Priority</p>
                <p>
                  <strong>{task.priority}</strong>
                </p>
              </div>
              <div className={styles.status}>
                <p>{task.status}</p>
              </div>
              <button className={styles.actionButtons} type="button">
                <EditIconSvg />
              </button>
              <button className={styles.actionButtons} type="button" onClick={deleteTask(task.id)}>
                <DeleteIconSvg />
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
}
