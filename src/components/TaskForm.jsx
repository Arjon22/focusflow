import { useState, useRef, useEffect } from "react";

import toast from "react-hot-toast";

function TaskForm({
  onAddTask,
  onUpdateTask,
  editingTask,
  defaultDueDate = "",
  onClose,
  onTaskAdded,
  allTasks = [],
}) {


  const [task, setTask] = useState("");

  const [dueDate, setDueDate] = useState(defaultDueDate);

  const [priority, setPriority] = useState("medium");

  const [dueTime, setDueTime] = useState("");

  const [reminder, setReminder] = useState("none");

  const [repeat, setRepeat] = useState("none");

  const [notes, setNotes] = useState("");



  const dateRef = useRef(null);
  const titleRef = useRef(null);



  useEffect(() => {

  if (!editingTask) return;


  setTask(editingTask.title ?? "");
  setPriority(editingTask.priority ?? "medium");
  setDueDate(editingTask.dueDate ?? "");
  setDueTime(editingTask.dueTime ?? "");
  setReminder(editingTask.reminder ?? "none");
  setRepeat(editingTask.repeat ?? "none");
  setNotes(editingTask.notes ?? "");


  setTimeout(() => {

    titleRef.current?.focus();

    titleRef.current?.select();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }, 100);


}, [editingTask]);



  const resetForm = () => {

    setTask("");

    setDueDate(defaultDueDate);

    setPriority("medium");

    setDueTime("");

    setReminder("none");

    setRepeat("none");

    setNotes("");

  };



  const handleSubmit = async (event) => {

    event.preventDefault();


    if (!task.trim()) return;
    const duplicate = allTasks.some(
  (item) =>
    item.title?.trim().toLowerCase() === task.trim().toLowerCase()
    &&
    item.firestoreId !== editingTask?.firestoreId
);


if (duplicate) {
  toast.error("Task already exists.");
  return;
}



    const now = new Date().toISOString();

const taskData = {
  title: task.trim(),

  priority,

  dueDate,

  dueTime,

  reminder,

  repeat,

  notes,

  completed: editingTask
    ? editingTask.completed
    : false,

  reminded: editingTask
    ? editingTask.reminded
    : false,

  createdAt: editingTask
    ? editingTask.createdAt
    : now,

  updatedAt: now,
};


    if (editingTask) {

    await onUpdateTask({
        ...editingTask,
        ...taskData,
    });

    

} else {

    await onAddTask(taskData);

    

}



    resetForm();


    if (onClose) {

      onClose();

    }

  };



  return (

    <div className="task-form">


      <form onSubmit={handleSubmit}>


        <input
  ref={titleRef}
  className="task-input"
  type="text"
  placeholder="✨ What needs to be done?"
  value={task}

          onChange={(e)=>setTask(e.target.value)}

        />



        <div className="priority-wrapper">


          <button
            type="button"
            className={`priority-option high ${
              priority === "high"
                ? "selected"
                : ""
            }`}
            onClick={()=>setPriority("high")}
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
            onClick={()=>setPriority("medium")}
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
            onClick={()=>setPriority("low")}
          >
            🟢 Low
          </button>


        </div>




        <div
          className="date-picker"
          onClick={() =>
            dateRef.current?.showPicker()
          }
        >

          📅

          <span>
            {dueDate || "Choose date"}
          </span>


          <input

            ref={dateRef}

            type="date"

            value={dueDate}

            onChange={(e)=>
              setDueDate(e.target.value)
            }

          />

        </div>




        <div
  className="time-input-wrapper"
  onClick={(e) => {
    const input = e.currentTarget.querySelector("input");
    input?.showPicker();
  }}
>

  <span className="time-label">
    ⏰ Due Time
  </span>


  <input
    className="task-input time-input"
    type="time"
    value={dueTime}
    onChange={(e) =>
      setDueTime(e.target.value)
    }
  />

</div>




        <select

          className="task-input"

          value={reminder}

          onChange={(e)=>
            setReminder(e.target.value)
          }

        >

          <option value="none">
            ⏰ No Reminder
          </option>

          <option value="5">
            5 minutes before
          </option>

          <option value="15">
            15 minutes before
          </option>

          <option value="30">
            30 minutes before
          </option>

          <option value="60">
            1 hour before
          </option>

          <option value="1440">
            1 day before
          </option>

        </select>





        <select

          className="task-input"

          value={repeat}

          onChange={(e)=>
            setRepeat(e.target.value)
          }

        >

          <option value="none">
            🔁 Never Repeat
          </option>

          <option value="daily">
            Daily
          </option>

          <option value="weekly">
            Weekly
          </option>

          <option value="monthly">
            Monthly
          </option>

          <option value="yearly">
            Yearly
          </option>

        </select>





        <textarea
  className="task-input notes-input"
  placeholder="📝 Notes (optional)"
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  rows={4}
/>




        <button

          className="add-button"

          type="submit"

        >

          {editingTask
            ? "💾 Save Changes"
            : "+ Add Task"}

        </button>




        {editingTask && (

          <button

            type="button"

            className="cancel-button"

            onClick={onClose}

          >

            Cancel

          </button>

        )}


      </form>


    </div>

  );

}


export default TaskForm;