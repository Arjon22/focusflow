import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

import { auth } from "../firebase/auth";

import {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
    deleteAllTasks,
} from "../firebase/tasks";


export default function useTasks() {

    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);


    // ------------------------
    // Local Storage Helpers
    // ------------------------

    const loadGuestTasks = () => {
        const saved = localStorage.getItem("guestTasks");

        if (saved) {
            setTasks(JSON.parse(saved));
        } else {
            setTasks([]);
        }
    };


    const saveGuestTasks = (newTasks) => {
        localStorage.setItem(
            "guestTasks",
            JSON.stringify(newTasks)
        );
    };


    // ------------------------
    // Load Firestore Tasks
    // ------------------------

    const loadTasks = async(uid) => {

        setLoading(true);

        try {

            const data = await getTasks(uid);

            setTasks(data);

        } catch (err) {

            console.error(
                "Failed to load tasks:",
                err
            );

        }

        setLoading(false);
    };



    // ------------------------
    // Auth Listener
    // ------------------------

    useEffect(() => {

        const unsubscribe =
            onAuthStateChanged(
                auth,
                async(currentUser) => {

                    setUser(currentUser);


                    if (currentUser) {

                        const guestTasks =
                            JSON.parse(
                                localStorage.getItem("guestTasks") || "[]"
                            );

                        if (guestTasks.length > 0) {

                            const existingTasks =
                                await getTasks(currentUser.uid);

                            for (const task of guestTasks) {

                                const alreadyExists =
                                    existingTasks.some(
                                        (existing) =>
                                        (existing.title || "").trim().toLowerCase() ===
                                        (task.title || "").trim().toLowerCase()
                                    );

                                if (!alreadyExists) {

                                    await addTask(
                                        currentUser.uid, {
                                            title: task.title,
                                            priority: task.priority,
                                            dueDate: task.dueDate,
                                            dueTime: task.dueTime,
                                            reminder: task.reminder,
                                            repeat: task.repeat,
                                            notes: task.notes,
                                            completed: task.completed,
                                        }
                                    );

                                }

                            }

                            localStorage.removeItem("guestTasks");

                        }

                        await loadTasks(currentUser.uid);

                    } else {

                        loadGuestTasks();

                        setLoading(false);

                    }

                }
            );


        return unsubscribe;

    }, []);



    // ------------------------
    // Add Task
    // ------------------------

    const createTask = async(task) => {


        // Guest Mode
        if (!user) {

            const guestTask = {

                ...task,

                id: Date.now(),

                firestoreId: null,

            };

            setTasks((prev) => {

                const updated = [
                    ...prev,
                    guestTask
                ];

                saveGuestTasks(updated);

                return updated;

            });

            toast.success("Task added.");

            return;

        }



        // Logged User

        try {

            const id =
                await addTask(
                    user.uid,
                    task
                );


            setTasks((prev) => [

                ...prev,

                {
                    ...task,
                    firestoreId: id,
                }

            ]);
            toast.success("Task added.");


        } catch (err) {

            console.error(err);
            toast.error("Failed to add task.");

        }

    };



    // ------------------------
    // Update Task
    // ------------------------

    const editTask = async(id, updates) => {


        if (!user) {

            setTasks((prev) => {

                const updated =
                    prev.map(task =>

                        task.id === id

                        ?
                        {
                            ...task,
                            ...updates
                        }

                        :
                        task

                    );


                saveGuestTasks(updated);
                toast.success("Task updated.");

                return updated;

            });


            return;

        }



        try {

            await updateTask(
                id,
                updates
            );


            setTasks((prev) =>

                prev.map(task =>

                    task.firestoreId === id

                    ?
                    {
                        ...task,
                        ...updates
                    }

                    :
                    task

                )

            );
            toast.success("Task updated.");


        } catch (err) {

            console.error(err);
            toast.error("Failed to update task.");

        }

    };



    // ------------------------
    // Delete Task
    // ------------------------

    const removeTask = async(id) => {


        if (!user) {


            setTasks((prev) => {

                const updated =
                    prev.filter(
                        task =>
                        task.id !== id
                    );


                saveGuestTasks(updated);

                return updated;

            });


            return;

        }



        try {

            await deleteTask(id);

            setTasks((prev) =>
                prev.filter(
                    (task) => task.firestoreId !== id
                )
            );

            toast.success("Task deleted.");

        } catch (err) {

            console.error(err);

            toast.error("Failed to delete task.");

        }

    };



    // ------------------------
    // Delete All
    // ------------------------

    const removeAllTasks = async() => {


        if (!user) {

            setTasks([]);

            localStorage.removeItem(
                "guestTasks"
            );
            toast.success("All tasks deleted.");

            return;

        }


        try {

            await deleteAllTasks(
                user.uid
            );

            setTasks([]);
            toast.success("All tasks deleted.");


        } catch (err) {

            console.error(err);
            toast.error("Failed to delete all tasks.");

        }

    };



    // ------------------------
    // Toggle Complete
    // ------------------------

    const toggleTask = async(task) => {


        await editTask(

            task.firestoreId || task.id,

            {
                completed:
                    !task.completed,
            }

        );

    };



    return {

        user,

        tasks,

        loading,


        addTask: createTask,

        updateTask: editTask,

        deleteTask: removeTask,

        deleteAllTasks: removeAllTasks,

        toggleTask,


        refresh: () => {

            if (user) {

                loadTasks(
                    user.uid
                );

            } else {

                loadGuestTasks();

            }

        }

    };

}