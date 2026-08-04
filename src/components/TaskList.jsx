function TaskList({
  tasks,
  onToggleTask,
  onEditClick,
  editingTaskId,
  editingText,
  setEditingText,
  onSaveEdit,
  onDeleteTask,
  onCancelEdit,
}) {
  return (

  tasks.length === 0 ? (

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

  ) : (

    <ul className="task-list">

      {tasks.map((task) => (

        <li
  className={`task-card ${
    task.completed ? "completed" : ""
  } fade-in`}
  key={task.id}
>

          <div className="task-main">

            <input
              className="task-checkbox"
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
            />


            {task.id === editingTaskId ? (

              <input
                className="edit-input"
                type="text"
                value={editingText}
                onChange={(e) =>
                  setEditingText(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSaveEdit();
                  }
                }}
              />

            ) : (

              <div className="task-info">

  <span className={`priority-badge ${task.priority || "medium"}`}>
    {(task.priority || "medium").charAt(0).toUpperCase() +
      (task.priority || "medium").slice(1)}
  </span>

  <span className="task-title">
    {task.title}
  </span>

  {task.dueDate && (
  <span className="task-date">
    📅 Due: {new Date(task.dueDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}
  </span>
)}
{task.dueDate &&
 !task.completed &&
 new Date(task.dueDate) < new Date(new Date().toDateString()) && (
  <span className="overdue-badge">
    ⚠️ Overdue
  </span>
)}
</div>

            )}

          </div>


          <div className="task-actions">

            {task.id === editingTaskId ? (

              <>
                <button
                  className="save-btn"
                  onClick={onSaveEdit}
                >
                  Save
                </button>


                <button
                  className="cancel-btn"
                  onClick={onCancelEdit}
                >
                  Cancel
                </button>
              </>

            ) : (

              <>

                <button
                  className="edit-btn"
                  onClick={() => onEditClick(task.id)}
                >
                  Edit
                </button>


                <button
                  className="delete-btn"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this task?"
                      )
                    ) {
                      onDeleteTask(task.id);
                    }
                  }}
                >
                  Delete
                </button>

              </>

            )}

          </div>

        </li>

      ))}

    </ul>
  )
  );
}

export default TaskList;