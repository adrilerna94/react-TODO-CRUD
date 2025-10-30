"use client";

import {Task, TaskList, TaskListAction, TaskListState} from "@/types";

// funciones

const editTaskList = (taskToUpdate: Task, taskList: TaskList) => {
  const filteredTasks = taskList.filter((task) => task.id !== taskToUpdate.id);

  return [...filteredTasks, taskToUpdate];
};

const deleteTask = (id: Task["id"], taskList: TaskList) =>
  taskList.filter((task) => task.id !== id);

// Reducer
export function taskListReducer(state: TaskListState, action: TaskListAction): TaskListState {
  let taskListUpdated = [];

  switch (action.type) {
    case "ADD":
      taskListUpdated = [...state.taskList, action.payload];

      return {taskList: taskListUpdated};
    case "EDIT":
      taskListUpdated = editTaskList(action.payload, state.taskList);

      return {taskList: taskListUpdated};
    case "DELETE":
      taskListUpdated = deleteTask(action.payload, state.taskList);

      return {taskList: taskListUpdated};
    case "LOAD_FROM_STORAGE":
      return {taskList: action.payload};
    default:
      return state;
  }
}
