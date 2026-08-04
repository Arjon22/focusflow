function ProductivityChart({ tasks }) {

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;


  const percentage =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );


  return (
    <div className="productivity-chart">

      <h3>
        📊 Productivity
      </h3>


      <div className="chart-info">

        <span>
          {completedTasks} completed out of {totalTasks} tasks
        </span>

        <strong>
          {percentage}%
        </strong>

      </div>


      <div className="chart-bar">

        <div
          className="chart-fill"
          style={{
            width: `${percentage}%`
          }}
        >
        </div>

      </div>


    </div>
  );
}


export default ProductivityChart;