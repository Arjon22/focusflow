import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [task, setTask] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (task.trim() === "") return;

    onAddTask(task);

    setTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;