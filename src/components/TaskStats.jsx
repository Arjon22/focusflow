function TaskStats({
  tasks = [],
  onDeleteAllTasks
}) {

  const total = tasks.length;

  const completed = tasks.filter(
    task => task.completed
  ).length;

  const remaining = total - completed;


  const progress =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        );


  return (

    <div className="task-stats-container">


      <div className="stats-cards">
        


        <div className="stat-card">
          <strong>
            {total}
          </strong>

          <span>
            Total
          </span>
        </div>



        <div className="stat-card">
          <strong>
            {completed}
          </strong>

          <span>
            Completed
          </span>
        </div>



        <div className="stat-card">
          <strong>
            {remaining}
          </strong>

          <span>
            Remaining
          </span>
        </div>


      </div>



      <button
  type="button"
  className="delete-all-btn"
  onClick={() => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all tasks?"
    );

    if (confirmDelete) {
      onDeleteAllTasks();
    }
  }}
>
  Delete All Tasks
</button>



      <div className="focus-progress">


        <h3>
          Focus Progress
        </h3>


        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width:`${progress}%`
            }}
          />

        </div>


        <p>
          {progress}% 
          <br/>
          {completed} completed out of {total} tasks
        </p>


      </div>



    </div>

  );

}


export default TaskStats;