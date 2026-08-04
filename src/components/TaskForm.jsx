import { useState, useRef } from "react";

function TaskForm({ onAddTask }) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const dateRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (task.trim() === "") return;

    onAddTask(task, priority, dueDate);

    setTask("");
    setDueDate("");
    setPriority("medium");
  };

  return (

  <div className="task-form">


    <form
 onSubmit={handleSubmit}
>

      <input
        className="task-input"
        type="text"
        placeholder="✨ What needs to be done?"
        value={task}
        onChange={(event) =>
          setTask(event.target.value)
        }
      />

      <div className="priority-wrapper">

        <button
          type="button"
          className={`priority-option high ${
            priority === "high"
              ? "selected"
              : ""
          }`}
          onClick={() => setPriority("high")}
        >
          🔴 High
        </button>

        <button
          type="button"
          className={`priority-option medium ${
            priority === "medium"
              ? "selected"
              : ""
          }`}
          onClick={() => setPriority("medium")}
        >
          🟡 Medium
        </button>

        <button
          type="button"
          className={`priority-option low ${
            priority === "low"
              ? "selected"
              : ""
          }`}
          onClick={() => setPriority("low")}
        >
          🟢 Low
        </button>

      </div>

      <div
        className="date-picker"
        onClick={() => dateRef.current.showPicker()}
      >

        📅

        <span>
          {dueDate
            ? dueDate
            : "Choose date"}
        </span>

        <input
          ref={dateRef}
          type="date"
          value={dueDate}
          onChange={(event) =>
            setDueDate(event.target.value)
          }
        />

      </div>

      <button
        className="add-button"
        type="submit"
      >
        + Add Task
      </button>

    </form>

  </div>

);
}

export default TaskForm;