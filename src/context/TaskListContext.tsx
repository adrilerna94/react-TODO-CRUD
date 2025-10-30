/*eslint-disable*/

'use client';

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { taskListReducer } from "@/reducers/TaskListReducer";
import { Task, TaskList, TaskListState } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";

// TO DO--> tipar el Contexto
type TaskListContextType = TaskListState & {
    addTask: (task: Task) => void;
    editTask: (task: Task) => void;
    deleteTask: (id: Task["id"]) => void;
    loadTaskList: (taskList: TaskList) => void;
}

// creamos el contexto
const TaskListContext = createContext<TaskListContextType | undefined>(undefined);

// creamos hook para usar el contexto

export const useTaskList = () => {
    const context = useContext(TaskListContext);
    if (context === undefined) {
        throw new Error ("useTaskList must be inside TaskListProvider");
    }
    return context;
}

// creamos el proveedor del contexto
export const TaskListProvider = ({children}: {children: ReactNode}) => {
    
    // 1️⃣ Leer localStorage
    const [localStorageValue, setLocalStorageStateValue] = useLocalStorage<TaskList>("taskList", [
        {id: 1, name: "Ir a comprar", status: "To Do", priority: "Medium"},
    ]);

    // 2️⃣ Inicializar el reducer con los datos del localStorage
    const [state, dispatch] = useReducer(taskListReducer, {taskList: localStorageValue});

    // 3️⃣ Cada vez que cambie el estado, guardarlo en localStorage
    useEffect(() => {
        setLocalStorageStateValue(state.taskList);
    }, [state.taskList, setLocalStorageStateValue])
    
    // 4️⃣ Acciones
    const addTask = (task: Task) => dispatch({type: "ADD", payload: task});
    const editTask= (task: Task) => dispatch({type: "EDIT", payload: task});
    const deleteTask= (id: Task["id"]) => dispatch({type: "DELETE", payload: id});
    const loadTaskList= (taskList: TaskList) => dispatch({type: "LOAD_FROM_STORAGE", payload: taskList});

    return (
        <TaskListContext.Provider
            value={{
                ...state,
                addTask,
                editTask,
                deleteTask,
                loadTaskList,
            }}
        >
            {children}
        </TaskListContext.Provider>
    );
};