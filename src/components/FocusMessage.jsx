function FocusMessage({ tasks = [] }) {


  const today = new Date()
    .toISOString()
    .split("T")[0];


  const overdue = tasks.filter(
    (task) =>
      task.dueDate &&
      task.dueDate < today &&
      !task.completed
  ).length;


  const highPriority = tasks.filter(
    (task) =>
      task.priority === "high" &&
      !task.completed
  ).length;


  const remaining = tasks.filter(
    (task) =>
      !task.completed
  ).length;



  let title;
  let message;



  if (remaining === 0) {

    title = "🎉 Everything Complete";

    message =
      "Amazing work! Your task list is clear.";

  }

  else if (overdue > 0) {

    title = "⚠️ Clear Your Backlog";

    message =
      `You have ${overdue} overdue task${
        overdue > 1 ? "s" : ""
      }. Handle those first.`;

  }

  else if (highPriority > 0) {

    title = "🔥 Focus On Priority";

    message =
      `You have ${highPriority} high priority task${
        highPriority > 1 ? "s" : ""
      } waiting.`;

  }

  else {

    title = "🌱 Keep Going";

    message =
      `${remaining} task${
        remaining > 1 ? "s" : ""
      } remaining. One step at a time.`;

  }



  return (

    <div className="focus-card">

      <h2>
        {title}
      </h2>

      <p>
        {message}
      </p>

    </div>

  );

}


export default FocusMessage;