import { useEffect, useRef } from "react";
import { isReminderDue } from "../services/reminderService";

function ReminderChecker({ tasks, onReminderUpdate }) {

    const notifiedTasks = useRef(new Set());


    const getReminderText = (minutes) => {

        switch (minutes) {

            case "5":
                return "5 minutes before";

            case "15":
                return "15 minutes before";

            case "30":
                return "30 minutes before";

            case "60":
                return "1 hour before";

            case "1440":
                return "1 day before";

            default:
                return `${minutes} minutes before`;

        }

    };


    useEffect(() => {


        const checkReminders = async () => {


            for (const task of tasks) {


                if (
                    task.completed ||
                    !task.dueDate ||
                    !task.dueTime ||
                    task.reminder === "none"
                ) {
                    continue;
                }



                if (isReminderDue(task)) {


                    const taskId = task.id;



                    if (
                        notifiedTasks.current.has(taskId)
                    ) {
                        continue;
                    }



                    notifiedTasks.current.add(taskId);



                    if (
                        "Notification" in window &&
                        Notification.permission === "granted"
                    ) {


                        new Notification(
                            "🔔 FocusFlow Reminder",
                            {
                                body:
                                `📌 ${task.title}\n` +
                                `⏰ ${getReminderText(task.reminder)}\n` +
                                `Priority: ${
                                    task.priority?.toUpperCase() ||
                                    "MEDIUM"
                                }`,
                            }
                        );



                        if (onReminderUpdate) {

    await onReminderUpdate(
        taskId,
        {
            reminded: true,
        },
        true
    );

}


                    }


                }


            }


        };



        // Check immediately
        checkReminders();



        // Check every 30 seconds
        const interval = setInterval(
            checkReminders,
            30000
        );



        return () => {
            clearInterval(interval);
        };


    }, [tasks, onReminderUpdate]);



    return null;

}


export default ReminderChecker;