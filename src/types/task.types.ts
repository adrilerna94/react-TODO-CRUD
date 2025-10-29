type Status = "To Do" | "Done" | "In Progress";
type Priority = "Medium" | "High" | "Low";

interface Task {
  id: number;
  name: string;
  status: Status;
  priority: Priority;
}

type TaskList = Task[];

export type {TaskList, Status, Priority, Task};
