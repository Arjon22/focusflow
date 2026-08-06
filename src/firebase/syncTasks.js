import { addTask, getTasks } from "./tasks";


export async function syncLocalTasks(userId, setTasks) {

    const localTasks =
        JSON.parse(localStorage.getItem("tasks")) || [];


    if (localTasks.length === 0) {
        return;
    }


    const existingTasks = await getTasks(userId);


    for (const task of localTasks) {

        const alreadyExists = existingTasks.some(
            (firebaseTask) =>
            firebaseTask.title.toLowerCase() ===
            task.title.toLowerCase()
        );


        if (!alreadyExists) {

            await addTask(
                userId,
                task
            );

        }

    }


    localStorage.removeItem("tasks");


    const updatedTasks = await getTasks(userId);


    setTasks(updatedTasks);


    console.log(
        `${localTasks.length} tasks synced successfully`
    );

}