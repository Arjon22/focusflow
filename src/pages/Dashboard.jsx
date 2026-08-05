import ProductivityChart from "../components/ProductivityChart";
import UpcomingTasks from "../components/UpcomingTasks";
import PriorityOverview from "../components/PriorityOverview";
import FocusMessage from "../components/FocusMessage";
import { useState } from "react";

function Dashboard({ tasks = [] }) {
  const totalTasks = tasks.length;

  const mediumPriorityTasks = tasks.filter(
  (task) =>
    task.priority === "medium" &&
    !task.completed
).length;


const lowPriorityTasks = tasks.filter(
  (task) =>
    task.priority === "low" &&
    !task.completed
).length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

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
      task.priority === "high" &&
      !task.completed
  ).length;

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 18
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  const messages = [
    "Ready to make today productive?",
    "One task at a time.",
    "Small progress is still progress.",
    "Stay focused. Stay consistent.",
    "Your future self will thank you."
  ];

  const [message] = useState(
  messages[Math.floor(Math.random() * messages.length)]
);

  return (
    <div className="dashboard">

      {/* HERO */}

      <div className="dashboard-hero">

        <div className="hero-left">

          <h1>🌿 Focus Dashboard</h1>

          <h2>{greeting}</h2>

          <p>{message}</p>

        </div>

        <div className="hero-right">

          <div className="hero-circle">

            <h1>{completionRate}%</h1>

            <span>Completed</span>

          </div>

        </div>

      </div>

      {/* STATS */}

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <strong>{totalTasks}</strong>
          <span>Total Tasks</span>
        </div>

        <div className="dashboard-card">
          <strong>{completedTasks}</strong>
          <span>Completed</span>
        </div>

        <div className="dashboard-card">
          <strong>{completionRate}%</strong>
          <span>Progress Rate</span>
        </div>

        <div className="dashboard-card">
          <strong>{todayTasks}</strong>
          <span>Today's Tasks</span>
        </div>

        <div className="dashboard-card">
          <strong>{overdueTasks}</strong>
          <span>Overdue</span>
        </div>

        <div className="dashboard-card">
          <strong>{highPriorityTasks}</strong>
          <span>High Priority</span>
        </div>
        <div className="dashboard-card">
  <strong>{mediumPriorityTasks}</strong>
  <span>Medium Priority</span>
</div>

<div className="dashboard-card">
  <strong>{lowPriorityTasks}</strong>
  <span>Low Priority</span>
</div>

      </div>

      {/* PRODUCTIVITY */}

      <div className="chart-card">
    <ProductivityChart tasks={tasks}/>
</div>
<UpcomingTasks tasks={tasks}/>
<PriorityOverview tasks={tasks}/>
<FocusMessage tasks={tasks}/>
    </div>
  );
}

export default Dashboard;