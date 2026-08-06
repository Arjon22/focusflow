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


      {/* ==========================
          HERO SECTION
      ========================== */}

      <section className="hero">


        <div className="hero-content">


          <span className="hero-tag">
            🌿 Productivity Reimagined.
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
              🚀 Get Started
            </Link>



            <Link
              to="/dashboard"
              className="secondary-btn"
            >
              📊 Dashboard
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





      {/* ==========================
          STATISTICS
      ========================== */}


      <section className="stats-section">


        <div className="stat-card">

          <span>📋</span>

          <h2>
            {totalTasks}
          </h2>

          <p>
            Total Tasks
          </p>

        </div>



        <div className="stat-card">

          <span>✅</span>

          <h2>
            {completedTasks}
          </h2>

          <p>
            Completed
          </p>

        </div>



        <div className="stat-card">

          <span>⏳</span>

          <h2>
            {pendingTasks}
          </h2>

          <p>
            Pending
          </p>

        </div>



        <div className="stat-card">

          <span>📈</span>

          <h2>
            {completionRate}%
          </h2>

          <p>
            Progress
          </p>

        </div>


      </section>






      {/* ==========================
          FEATURES
      ========================== */}



      <section className="features-section">


        <div className="section-title">


          <h2>
            ✨ Why FocusFlow?
          </h2>


          <p>
            Everything you need to stay productive
            in one simple and beautiful workspace.
          </p>


        </div>





        <div className="features-grid">


          <div className="feature-card">

            <span>
              ⚡
            </span>

            <h3>
              Fast & Lightweight
            </h3>

            <p>
              Instant performance with local storage.
            </p>

          </div>





          <div className="feature-card">

            <span>
              📅
            </span>

            <h3>
              Smart Calendar
            </h3>

            <p>
              Plan your schedule with ease.
            </p>

          </div>





          <div className="feature-card">

            <span>
              🔔
            </span>

            <h3>
              Task Reminders
            </h3>

            <p>
              Never miss important deadlines.
            </p>

          </div>





          <div className="feature-card">

            <span>
              📊
            </span>

            <h3>
              Productivity Insights
            </h3>

            <p>
              Track your progress every day.
            </p>

          </div>



        </div>



      </section>



    </div>

  );

}


export default Home;