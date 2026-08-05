function UpcomingTasks({ tasks = [] }) {

  const today = new Date()
    .toISOString()
    .split("T")[0];


  const upcomingTasks = tasks
    .filter((task) =>
      task.dueDate &&
      task.dueDate >= today &&
      !task.completed
    )
    .sort(
      (a, b) =>
        new Date(a.dueDate) -
        new Date(b.dueDate)
    )
    .slice(0, 5);


  return (

    <div className="upcoming-card">

      <h2>
        📅 Upcoming Tasks
      </h2>


      {
        upcomingTasks.length === 0 ? (

          <p className="empty-text">
            🎉 No upcoming tasks.
          </p>

        ) : (

          upcomingTasks.map((task) => (

            <div
              className="upcoming-task"
              key={task.id}
            >

              <div>

                <strong>
                  {task.title}
                </strong>


                <p>
                  {task.dueDate}

                  {task.dueTime &&
                    ` • ${task.dueTime}`
                  }
                </p>

              </div>


              <span
                className={`priority ${task.priority}`}
              >
                {task.priority}
              </span>


            </div>

          ))

        )
      }


    </div>

  );
}


export default UpcomingTasks;