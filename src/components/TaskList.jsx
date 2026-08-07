import { motion } from "framer-motion";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import formatTime from "../utils/formatTime";
const getTaskStatus = (dueDate) => {
  if (!dueDate) return null;


  const today = new Date();
  const due = new Date(dueDate);


  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);


  const difference =
    (due - today) /
    (1000 * 60 * 60 * 24);



  if (difference < 0) {
    return {
      text: "⚠️ Overdue",
      className: "status-overdue",
    };
  }


  if (difference === 0) {
    return {
      text: "🟡 Due Today",
      className: "status-today",
    };
  }


  if (difference === 1) {
    return {
      text: "🔵 Due Tomorrow",
      className: "status-tomorrow",
    };
  }


  return {
    text: `🟢 Due in ${difference} days`,
    className: "status-upcoming",
  };
};



function TaskList({
  tasks,
  onToggleTask,
  onEditTask,
  onDeleteTask,
}) {
const [deleteTaskId, setDeleteTaskId] = useState(null);

  if (tasks.length === 0) {

    return (

      <div className="empty-state">

        <div className="empty-icon">
          🌸
        </div>


        <h3>
          No tasks yet
        </h3>


        <p>
          Add your first task and start focusing.
        </p>
        


      </div>

    );

  }



  return (

    <ul className="task-list">


      {tasks.map((task) => {


        const status =
          getTaskStatus(task.dueDate);



        return (

          <motion.li
  layout
  initial={{ opacity: 0, y: 15, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{
    duration: 0.25,
    ease: "easeOut",
  }}
  key={task.firestoreId || task.id}
  className={`task-card ${
    task.completed ? "completed" : ""
  } fade-in`}
>



            <div className="task-main">



              <input
  className="task-checkbox"
  type="checkbox"
  checked={task.completed || false}
  onChange={(e) => {
    e.stopPropagation();
    onToggleTask(task);
  }}
/>



              <div className="task-info">



                <div className="task-top-row">



                  <span

                    className={
                      `priority-badge ${
                        task.priority ||
                        "medium"
                      }`
                    }

                  >

                    {
                      (
                        task.priority ||
                        "medium"
                      ).toUpperCase()
                    }

                  </span>




                  {!task.completed &&
                    status && (

                    <span

                      className={
                        `task-status ${
                          status.className
                        }`
                      }

                    >

                      {status.text}

                    </span>

                  )}



                </div>




                <h3 className="task-title">

                  {task.title}

                </h3>




                {task.dueDate && (

    <span className="task-date">

        📅{" "}

        {
            new Date(
                task.dueDate
            ).toLocaleDateString(
                "en-US",
                {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }
            )
        }


        {task.dueTime && (
            <>
                {" "}⏰ {formatTime(task.dueTime)}
            </>
        )}

    </span>

)}



              </div>



            </div>




            <div className="task-actions">



              <motion.button
  type="button"
  className="edit-btn"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.15 }}
  onClick={() => onEditTask(task)}
>
  Edit
</motion.button>




              <motion.button
  type="button"
  className="delete-btn"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.15 }}
  onClick={() =>
  setDeleteTaskId(
    task.firestoreId || task.id
  )
}
>
  Delete
</motion.button>



            </div>



          </motion.li>

        );


      })}

      {deleteTaskId && (

  <ConfirmModal

    title="Delete Task?"

    message="Are you sure you want to delete this task?"

    onCancel={() =>
      setDeleteTaskId(null)
    }

    onConfirm={() => {

      onDeleteTask(deleteTaskId);

      setDeleteTaskId(null);

    }}

  />

)}


    </ul>

  );

}


export default TaskList;