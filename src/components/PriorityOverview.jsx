function PriorityOverview({ tasks = [] }) {

  const activeTasks = tasks.filter(
    (task) => !task.completed
  );


  const high =
    activeTasks.filter(
      (task) => task.priority === "high"
    ).length;


  const medium =
    activeTasks.filter(
      (task) => task.priority === "medium"
    ).length;


  const low =
    activeTasks.filter(
      (task) => task.priority === "low"
    ).length;


  const total =
    high + medium + low;


  const percentage = (value) => {

    if (total === 0) return 0;

    return Math.round(
      (value / total) * 100
    );

  };


  return (

    <div className="priority-card">

      <h2>
        🔥 Priority Overview
      </h2>


      <div className="priority-row">

        <span>
          🔴 High
        </span>

        <div className="progress">

          <div
            className="progress-fill high-fill"
            style={{
              width: `${percentage(high)}%`
            }}
          />

        </div>

        <strong>
          {high}
        </strong>

      </div>



      <div className="priority-row">

        <span>
          🟡 Medium
        </span>

        <div className="progress">

          <div
            className="progress-fill medium-fill"
            style={{
              width: `${percentage(medium)}%`
            }}
          />

        </div>

        <strong>
          {medium}
        </strong>

      </div>



      <div className="priority-row">

        <span>
          🟢 Low
        </span>

        <div className="progress">

          <div
            className="progress-fill low-fill"
            style={{
              width: `${percentage(low)}%`
            }}
          />

        </div>

        <strong>
          {low}
        </strong>

      </div>


    </div>

  );
}


export default PriorityOverview;