import ProductivityChart from "../components/ProductivityChart";
import UpcomingTasks from "../components/UpcomingTasks";
import PriorityOverview from "../components/PriorityOverview";
import FocusMessage from "../components/FocusMessage";
import { useState } from "react";

function Dashboard({ tasks = [] }) {
  const totalTasks = tasks.length;


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

      {/* HERO */}

<div className="dashboard-hero">

  <div className="hero-text">

    <span className="hero-badge">
      🌿 FocusFlow Dashboard
    </span>

    <h1>{greeting}</h1>

    <p>{message}</p>

  </div>

  <div className="hero-progress">

    <div
  className="progress-ring"
  style={{ "--progress": completionRate }}
>

      <span>{completionRate}%</span>

      <small>Completed</small>

    </div>

  </div>

</div>

      {/* STATS */}

      <div className="dashboard-grid">

  <div className="dashboard-card">
    <div className="card-top">
      <div className="card-icon total">📋</div>
      <div className="card-label">Total Tasks</div>
    </div>
    <h2>{totalTasks}</h2>
    <small>Everything you've planned</small>
  </div>

  <div className="dashboard-card">
    <div className="card-top">
      <div className="card-icon completed">✅</div>
      <div className="card-label">Completed</div>
    </div>
    <h2>{completedTasks}</h2>
    <small>Tasks finished successfully</small>
  </div>

  <div className="dashboard-card">
    <div className="card-top">
      <div className="card-icon progress">📈</div>
      <div className="card-label">Progress</div>
    </div>
    <h2>{completionRate}%</h2>
    <small>Overall completion rate</small>
  </div>

  <div className="dashboard-card">
    <div className="card-top">
      <div className="card-icon today">📅</div>
      <div className="card-label">Today's Tasks</div>
    </div>
    <h2>{todayTasks}</h2>
    <small>Due today</small>
  </div>

  <div className="dashboard-card">
    <div className="card-top">
      <div className="card-icon overdue">⏰</div>
      <div className="card-label">Overdue</div>
    </div>
    <h2>{overdueTasks}</h2>
    <small>Need your attention</small>
  </div>

  <div className="dashboard-card">
    <div className="card-top">
      <div className="card-icon priority">🔥</div>
      <div className="card-label">High Priority</div>
    </div>
    <h2>{highPriorityTasks}</h2>
    <small>Important tasks first</small>
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