function TaskStats({ tasks, onDeleteAllTasks }) {

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const remainingTasks = totalTasks - completedTasks;


  return (
    <div className="task-stats">

      <div>
        <strong>{totalTasks}</strong>
        <span>Total</span>
      </div>

      <div>
        <strong>{completedTasks}</strong>
        <span>Completed</span>
      </div>

      <div>
        <strong>{remainingTasks}</strong>
        <span>Remaining</span>
      </div>
<button
  className="delete-all-btn"
  onClick={onDeleteAllTasks}
>
  Delete All Tasks
</button>
    </div>
  );
}

export default TaskStats;