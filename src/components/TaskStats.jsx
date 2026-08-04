function TaskStats({ tasks, onDeleteAllTasks }) {

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const remainingTasks = totalTasks - completedTasks;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);


  return (
    <div className="task-stats-wrapper">


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



      <div className="progress-container">

        <div className="progress-header">
          <span>
            Focus Progress
          </span>

          <strong>
            {progress}%
          </strong>

        </div>


        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`
            }}
          >
          </div>

        </div>


        <p>
          {completedTasks} completed out of {totalTasks} tasks
        </p>


      </div>


    </div>
  );
}

export default TaskStats;