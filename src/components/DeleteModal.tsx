import {Task} from "./TaskList";

import {CloseIconSvg} from "@/lib/CloseIcon";

export function DeleteTaskModal({
  selectedTask,
  closeModal,
  handleDeleteTask,
}: {
  selectedTask: Task;
  closeModal: () => void;
  handleDeleteTask: (task: Task) => () => void;
}) {
  return (
    <div>
      <button type="button" onClick={closeModal}>
        <CloseIconSvg />
      </button>
      <h3>
        Are you sure you want to delete <strong>{selectedTask.name}</strong> Task
      </h3>
      <button type="button" onClick={handleDeleteTask(selectedTask)}>
        Delete
      </button>
      <button type="button" onClick={closeModal}>
        Cancel
      </button>
    </div>
  );
}
