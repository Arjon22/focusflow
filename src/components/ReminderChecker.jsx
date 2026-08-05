import { useEffect, useRef } from "react";

function ReminderChecker({ tasks }) {

  const notifiedTasks = useRef(new Set());
  const getReminderText = (minutes) => {

  switch (minutes) {
    case "5":
      return "5 minutes";

    case "15":
      return "15 minutes";

    case "30":
      return "30 minutes";

    case "60":
      return "1 hour";

    case "1440":
      return "1 day";

    default:
      return `${minutes} minutes`;
  }

};

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

        const reminderTime = new Date(
          taskDateTime.getTime() -
          Number(task.reminder) * 60000
        );

        const difference = now - reminderTime;

        if (
          difference >= 0 &&
          difference < 60000
        ) {

          if (!notifiedTasks.current.has(task.id)) {

            notifiedTasks.current.add(task.id);

            new Notification(
  "🔔 FocusFlow Reminder",
  {
    body:
  `📌 ${task.title}\n` +
  `⏰ Starts in ${getReminderText(task.reminder)}\n` +
  `Priority: ${task.priority.toUpperCase()}`,
  }
);
          }

        }

        // Remove completed reminders from the tracker
        if (now > taskDateTime) {
          notifiedTasks.current.delete(task.id);
        }

      });

    };

    // Check immediately
    checkReminders();

    // Then check every 30 seconds
    const interval = setInterval(
      checkReminders,
      30000
    );

    return () => clearInterval(interval);

  }, [tasks]);

  return null;
}

export default ReminderChecker;