function TaskList({
  tasks,
  onToggleTask,
  onEditClick,
  editingTaskId,
  editingText,
  setEditingText,
  onSaveEdit,
  onDeleteTask,
}) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleTask(task.id)}
          />

          {task.id === editingTaskId ? (
            <>
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSaveEdit();
                  }
                }}
              />

              <button onClick={onSaveEdit}>Save</button>
            </>
          ) : (
            <>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  marginLeft: "8px",
                }}
              >
                {task.title}
              </span>

              <button onClick={() => onEditClick(task.id)}>
                Edit
              </button>

              <button
  onClick={() => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDeleteTask(task.id);
    }
  }}
>
  Delete
</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;