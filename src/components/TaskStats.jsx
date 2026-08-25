import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
function TaskStats({
  tasks = [],
  onDeleteAllTasks
}) {
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

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
  <>
  {showDeleteAllModal && (

      <ConfirmModal

        title="Delete All Tasks?"

        message="This will permanently remove all your tasks."

        onCancel={() =>
          setShowDeleteAllModal(false)
        }

        onConfirm={() => {

          onDeleteAllTasks();

          setShowDeleteAllModal(false);

        }}

      />

    )}

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
        onClick={() => setShowDeleteAllModal(true)}
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
              width: `${progress}%`
            }}
          />

        </div>


        <p>
          {progress}%
          <br />
          {completed} completed out of {total} tasks
        </p>


      </div>


    </div>



    


  </>
);

}


export default TaskStats;