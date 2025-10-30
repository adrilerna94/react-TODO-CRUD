type Status = "To Do" | "Done" | "In Progress";
type Priority = "Medium" | "High" | "Low";

interface Task {
  id: number;
  name: string;
  status: Status;
  priority: Priority;
}

type TaskList = Task[];

// tipamos el estado
interface TaskListState {
  taskList: TaskList;
}

// tipamos action
type TaskListAction =
  | {type: "LOAD_FROM_STORAGE"; payload: TaskList}
  | {type: "ADD"; payload: Task}
  | {type: "DELETE"; payload: Task["id"]}
  | {type: "EDIT"; payload: Task};

export type {TaskList, Status, Priority, Task, TaskListState, TaskListAction};
