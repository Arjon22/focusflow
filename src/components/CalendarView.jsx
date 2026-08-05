import { useState } from "react";
import TaskForm from "./TaskForm";
function getTaskCategory(title) {

  const text = title.toLowerCase();


  if (
    text.includes("shop") ||
    text.includes("buy") ||
    text.includes("grocery")
  ) {
    return {
      icon: "🛒",
      category: "Shopping"
    };
  }


  if (
    text.includes("walk") ||
    text.includes("run") ||
    text.includes("gym") ||
    text.includes("exercise")
  ) {
    return {
      icon: "🏃",
      category: "Health"
    };
  }


  if (
    text.includes("study") ||
    text.includes("learn") ||
    text.includes("read")
  ) {
    return {
      icon: "📚",
      category: "Learning"
    };
  }


  if (
    text.includes("meeting") ||
    text.includes("call")
  ) {
    return {
      icon: "📞",
      category: "Work"
    };
  }


  return {
    icon: "📌",
    category: "General"
  };
}

function CalendarView({
  tasks,
  onAddTask,
}) {
    
    

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  


  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const selectedTasks = tasks.filter(
  (task) =>
    task.dueDate ===
    `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`
);


  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });


  const firstDay = new Date(year, month, 1).getDay();


  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();


  const calendarDays = [];


  // Empty spaces before first day
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push("");
  }


  // Add dates
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }



  function previousMonth() {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  }


  function nextMonth() {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  }



  return (
    <div className="calendar-container">

      <div className="calendar-header">

        <button onClick={previousMonth}>
          ◀
        </button>


        <h2>
          {monthName} {year}
        </h2>


        <button onClick={nextMonth}>
          ▶
        </button>

      </div>



      <div className="calendar-grid">


        {[
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ].map((day) => (
          <div
            key={day}
            className="calendar-day-name"
          >
            {day}
          </div>
        ))}



        {calendarDays.map((day, index) => {

  const isToday =
    day &&
    day === new Date().getDate() &&
    month === new Date().getMonth() &&
    year === new Date().getFullYear();


  const isSelected =
    selectedDate === day;


  return (
    <div
  key={index}
  onClick={() => {
  if (day) {
    setSelectedDate(day);
    setShowTaskForm(false);
  }
}}
  className={
    isSelected
      ? "calendar-date selected"
      : isToday
      ? "calendar-date today"
      : "calendar-date"
  }
>
  {day}


  {day &&
    tasks.some(
      (task) =>
        task.dueDate ===
        `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    ) && (
      <span className="task-dot"></span>
    )}

</div>
  );

})}


      </div>
      <div className="selected-date-panel">

  {selectedDate ? (
    <>
      <h3>
        Selected Date:
        {" "}
        {monthName} {selectedDate}, {year}
      </h3>

      <h4>Tasks</h4>

      {selectedTasks.length > 0 ? (
        selectedTasks.map((task) => (
  <div
    key={task.id}
    className="calendar-task"
  >
    

    <div className="calendar-task-title">

  {getTaskCategory(task.title).icon}

  {" "}

  {task.title}

</div>

    <div className="calendar-task-info">

  {getTaskCategory(task.title).category}

</div>

    <div className="calendar-task-info">
      ⏰ {task.dueTime || "No time set"}
    </div>

  </div>
))
      ) : (
        <p>
          No tasks scheduled.
        </p>
      )}
      <button
  className="calendar-add-task"
  onClick={() => setShowTaskForm(true)}
>
  + Add Task
</button>
{showTaskForm && selectedDate && (
  <TaskForm
  onAddTask={onAddTask}
  defaultDueDate={
    `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`
  }
  onClose={() => setShowTaskForm(false)}
  onTaskAdded={() => setShowTaskForm(false)}
/> )}


    </>
  ) : (
    <p>
      Select a date to view tasks.
    </p>
  )}

</div>


    </div>
  );
}

export default CalendarView;