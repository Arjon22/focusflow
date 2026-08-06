import { Link } from "react-router-dom";
import HeroImage from "../assets/hero-illustration.jpg";

function Home({ tasks }) {
  const totalTasks = tasks.length;

const completedTasks =
  tasks.filter((task) => task.completed).length;

const pendingTasks =
  totalTasks - completedTasks;

const completionRate =
  totalTasks === 0
    ? 0
    : Math.round(
        (completedTasks / totalTasks) * 100
      );
  return (
    <div className="home-page">

      {/* Hero Section */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-tag">
  🌿 Productivity Reimagined • Focus Better
</span>

          <h1>
            Focus on what
            <br />
            truly matters.
          </h1>

          <p>
            Organize your tasks, manage your time,
            and build better habits with one clean,
            beautiful workspace.
          </p>

          <div className="hero-buttons">

            <Link
              to="/tasks"
              className="primary-btn"
            >
              Get Started
            </Link>

            <Link
              to="/dashboard"
              className="secondary-btn"
            >
              View Dashboard
            </Link>

          </div>

        </div>

        <div className="hero-image">
  <img
    src={HeroImage}
    alt="FocusFlow Hero"
  />
</div>

      </section>
      <section className="stats-section">

  <div className="stat-card">

    <span>📋</span>

    <h2>{totalTasks}</h2>

    <p>Total Tasks</p>

  </div>

  <div className="stat-card">

    <span>✅</span>

    <h2>{completedTasks}</h2>

    <p>Completed</p>

  </div>

  <div className="stat-card">

    <span>⏳</span>

    <h2>{pendingTasks}</h2>

    <p>Pending</p>

  </div>

  <div className="stat-card">

    <span>📈</span>

    <h2>{completionRate}%</h2>

    <p>Progress</p>

  </div>

</section>

    </div>
  );
}

export default Home;