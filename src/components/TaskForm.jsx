import { useState, useRef } from "react";

function TaskForm({ onAddTask }) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueTime, setDueTime] = useState("");

const [reminder, setReminder] = useState("none");

const [repeat, setRepeat] = useState("none");

const [notes, setNotes] = useState("");
  const dateRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (task.trim() === "") return;

    onAddTask(
  task,
  priority,
  dueDate,
  dueTime,
  reminder,
  repeat,
  notes
);

    setTask("");
    setDueDate("");
    setPriority("medium");
    setDueTime("");
setReminder("none");
setRepeat("none");
setNotes("");
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
      {/* NEW: Due Time */}
<input
  className="task-input"
  type="time"
  value={dueTime}
  onChange={(e) => setDueTime(e.target.value)}
/>

{/* NEW: Reminder */}
<select
  className="task-input"
  value={reminder}
  onChange={(e) => setReminder(e.target.value)}
>
  <option value="none">⏰ No Reminder</option>
  <option value="5">5 minutes before</option>
  <option value="15">15 minutes before</option>
  <option value="30">30 minutes before</option>
  <option value="60">1 hour before</option>
  <option value="1440">1 day before</option>
</select>

{/* NEW: Repeat */}
<select
  className="task-input"
  value={repeat}
  onChange={(e) => setRepeat(e.target.value)}
>
  <option value="none">🔁 Never Repeat</option>
  <option value="daily">Daily</option>
  <option value="weekly">Weekly</option>
  <option value="monthly">Monthly</option>
  <option value="yearly">Yearly</option>
</select>

{/* NEW: Notes */}
<textarea
  className="task-input"
  placeholder="📝 Notes (optional)"
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  rows={4}
/>

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