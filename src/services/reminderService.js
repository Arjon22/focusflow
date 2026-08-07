import { getNow } from "./dateService";


export function isReminderDue(task) {

    if (!task) return false;

    if (
        task.completed ||
        task.reminded ||
        task.reminder === "none" ||
        !task.dueDate ||
        !task.dueTime
    ) {
        return false;
    }


    const now = getNow();


    const taskDateTime = new Date(
        `${task.dueDate}T${task.dueTime}`
    );


    const reminderMinutes =
        Number(task.reminder);


    const reminderTime =
        new Date(
            taskDateTime.getTime() -
            reminderMinutes * 60000
        );


    return now >= reminderTime;
}