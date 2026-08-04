function TaskList({ tasks, onToggleTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleTask(task.id)}
          />

          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              marginLeft: "8px",
            }}
          >
            {task.title}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;