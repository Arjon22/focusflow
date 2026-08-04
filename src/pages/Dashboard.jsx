import ProductivityChart from "../components/ProductivityChart";

function Dashboard({ tasks = [] }) {

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;


  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );


  const today = new Date()
    .toISOString()
    .split("T")[0];


  const todayTasks = tasks.filter(
    (task) =>
      task.dueDate === today &&
      !task.completed
  ).length;


  const overdueTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      task.dueDate < today &&
      !task.completed
  ).length;


  const highPriorityTasks = tasks.filter(
    (task) =>
      task.priority === "high"
  ).length;



  return (
    <div className="dashboard">


      <h2>
        🌿 Focus Dashboard
      </h2>



      <div className="dashboard-grid">


        <div className="dashboard-card">
          <strong>
            {totalTasks}
          </strong>
          <span>
            Total Tasks
          </span>
        </div>



        <div className="dashboard-card">
          <strong>
            {completedTasks}
          </strong>
          <span>
            Completed
          </span>
        </div>



        <div className="dashboard-card">
          <strong>
            {completionRate}%
          </strong>
          <span>
            Progress Rate
          </span>
        </div>



        <div className="dashboard-card">
          <strong>
            {todayTasks}
          </strong>
          <span>
            Today's Tasks
          </span>
        </div>



        <div className="dashboard-card">
          <strong>
            {overdueTasks}
          </strong>
          <span>
            Overdue
          </span>
        </div>



        <div className="dashboard-card">
          <strong>
            {highPriorityTasks}
          </strong>
          <span>
            High Priority
          </span>
        </div>


      </div>



      <ProductivityChart
        tasks={tasks}
      />


    </div>
  );
}


export default Dashboard;