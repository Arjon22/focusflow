import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (task.trim() === "") return;

    onAddTask(task, priority, dueDate);

    setTask("");
    setDueDate("");
    setPriority("medium");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>

      <input
        className="task-input"
        type="text"
        placeholder="Turn your goals into progress"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />


      <select
        className="priority-select"
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="high">
          High
        </option>

        <option value="medium">
          Medium
        </option>

        <option value="low">
          Low
        </option>

      </select>


      <input
        className="date-input"
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      />


      <button className="add-button" type="submit">
        Add Task
      </button>

    </form>
  );
}

export default TaskForm;