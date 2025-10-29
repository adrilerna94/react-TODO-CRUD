"use client";

import {useState} from "react";

import styles from "./TaskList.module.css";
import {AddTaskModal} from "./AddTaskModal";
import {EditTaskModal} from "./EditTaskModal";
import {DeleteTaskModal} from "./DeleteModal";

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
  // Para añadir
  const [inputText, setInputText] = useState<Task["name"]>("");
  const [inputPriority, setInputPriority] = useState<Priority>("Low");

  // 🔽 Nuevo: para editar
  const [editText, setEditText] = useState<Task["name"]>("");
  const [editPriority, setEditPriority] = useState<Priority>("Medium");

  const [isAddModalOpen, setToggleAddModal] = useState<boolean>(false);
  const [isEditModalOpen, setToggleEditModal] = useState<boolean>(false);
  const [isDeleteModalOpen, setToggleDeleteModal] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task>({
    id: 0,
    name: "",
    status: "Done",
    priority: "High",
  });
  const [selectedTaskToDelete, setSelectedTaskToDelete] = useState<Task>({
    id: 0,
    name: "",
    status: "Done",
    priority: "High",
  });

  // Handlers del modal de edición
  const handleEditTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleEditTaskPriority = (newPriority: Task["priority"]) => {
    return () => setEditPriority((prev) => (prev !== newPriority ? newPriority : prev));
  };

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    setInputText(text);
  };
  const handleTaskPriority = (newPriority: Task["priority"]) => {
    return () => setInputPriority((prev) => (prev !== newPriority ? newPriority : prev));
  };

  const handleTaskSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText !== "") {
      const task: Omit<Task, "id"> = {
        name: inputText,
        priority: inputPriority,
        status: "To Do", // por defecto
      };

      addToTaskList(task);
      setInputText("");
      setInputPriority("Low");
      setToggleAddModal(false);
    }
  };
  const handleTaskSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // no hace nada si no cambia nada
    if (editText === selectedTask.name && editPriority === selectedTask.priority) {
      return;
    }

    const taskToUpdate: Task = {
      id: selectedTask.id,
      name: editText,
      priority: editPriority,
      status: selectedTask.status,
    };

    editTaskList(taskToUpdate);
    setToggleEditModal(false); // cerrar modal tras editar
  };

  const editTaskList = (task: Task) => {
    const filteredTasks = taskList.filter((task) => task.id !== selectedTask.id);

    setTaskList([...filteredTasks, task]);
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

  const openAddModal = () => setToggleAddModal(true);
  const closeAddModal = () => setToggleAddModal(false);

  const closeDeleteModal = () => setToggleDeleteModal(false);
  const openDeleteModal = (task: Task) => {
    return () => {
      setSelectedTaskToDelete(task);
      setToggleDeleteModal(true);
    };
  };

  const handleDeleteTask = (task: Task) => {
    return () => {
      deleteTask(task.id);
      setToggleDeleteModal(false);
    };
  };

  const openEditModal = (task: Task) => {
    return () => {
      setSelectedTask(task);
      setEditText(task.name); // ✅ sincroniza texto
      setEditPriority(task.priority); // ✅ sincroniza prioridad
      setToggleEditModal(true);
    };
  };

  const closeEditModal = () => setToggleEditModal(false);

  const deleteTask = (id: Task["id"]) =>
    setTaskList((taskList) => taskList.filter((task) => task.id !== id));

  return (
    <section className={styles.taskSection}>
      <h2>TASK LIST</h2>
      <button className={styles.plusButtonContainer} type="button" onClick={openAddModal}>
        <div>
          <PlusIconSvg />
          <p>Add Task</p>
        </div>
      </button>
      {isAddModalOpen && (
        <AddTaskModal
          closeModal={closeAddModal}
          handleTaskChange={handleTaskChange}
          handleTaskPriority={handleTaskPriority}
          handleTaskSubmit={handleTaskSubmit}
          priority={inputPriority}
          taskText={inputText}
        />
      )}

      {isEditModalOpen && (
        <EditTaskModal
          closeModal={closeEditModal}
          handleTaskChange={handleEditTaskChange}
          handleTaskPriority={handleEditTaskPriority}
          handleTaskSubmit={handleTaskSubmitEdit}
          priority={editPriority}
          selectedTask={selectedTask}
          taskText={editText}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteTaskModal
          closeModal={closeDeleteModal}
          handleDeleteTask={handleDeleteTask}
          selectedTask={selectedTaskToDelete}
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
              <button className={styles.actionButtons} type="button" onClick={openEditModal(task)}>
                <EditIconSvg />
              </button>
              <button
                className={styles.actionButtons}
                type="button"
                onClick={openDeleteModal(task)}
              >
                <DeleteIconSvg />
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
}
