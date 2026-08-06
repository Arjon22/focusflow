const getTaskStatus = (dueDate) => {
  if (!dueDate) return null;

  const today = new Date();
  const due = new Date(dueDate);

  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const difference = (due - today) / (1000 * 60 * 60 * 24);

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
  onEditClick,
  editingTaskId,
  editingText,
  setEditingText,
  onSaveEdit,
  onDeleteTask,
  onCancelEdit,
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🌸</div>

        <h3>No tasks yet</h3>

        <p>Add your first task and start focusing.</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => {
        const status = getTaskStatus(task.dueDate);

        return (
          <li key={task.firestoreId || task.id}
            className={`task-card ${
              task.completed ? "completed" : ""
            } fade-in`}
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

  <div className="task-top-row">

    <span
      className={`priority-badge ${
        task.priority || "medium"
      }`}
    >
      {(task.priority || "medium").toUpperCase()}
    </span>

    {!task.completed && status && (
      <span
        className={`task-status ${status.className}`}
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
      {new Date(task.dueDate).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      )}
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
        );
      })}
    </ul>
  );
}

export default TaskList;