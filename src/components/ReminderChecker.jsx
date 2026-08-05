import { useEffect } from "react";


function ReminderChecker({ tasks }) {
    console.log("Reminder checker running");


  useEffect(() => {

    const checkReminders = () => {


      const now = new Date();


      tasks.forEach((task) => {


        if (
          task.completed ||
          !task.dueDate ||
          !task.dueTime ||
          task.reminder === "none"
        ) {
          return;
        }


        const taskDateTime = new Date(
          `${task.dueDate}T${task.dueTime}`
        );


        const reminderTime =
          new Date(
            taskDateTime.getTime()
            -
            Number(task.reminder) * 60000
          );


        const difference =
          now - reminderTime;


        if (
          difference >= 0 &&
          difference < 60000
        ) {

          new Notification(
            "FocusFlow Reminder 🔔",
            {
              body:
              `${task.title} starts soon.`,
            }
          );

        }


      });

    };


    const interval = setInterval(
      checkReminders,
      30000
    );


    return () =>
      clearInterval(interval);


  }, [tasks]);


  return null;
}


export default ReminderChecker;