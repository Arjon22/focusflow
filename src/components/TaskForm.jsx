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
  <form className="task-form" onSubmit={handleSubmit}>

    <input
      className="task-input"
      type="text"
      placeholder="What needs your focus today?"
      value={task}
      onChange={(event) => setTask(event.target.value)}
    />

    <button className="add-button" type="submit">
      Add Task
    </button>

  </form>
);
}

export default TaskForm;