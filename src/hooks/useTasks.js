import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

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

                        await loadTasks(
                            currentUser.uid
                        );

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


        } catch (err) {

            console.error(err);

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


        } catch (err) {

            console.error(err);

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
                    task =>
                    task.firestoreId !== id
                )

            );


        } catch (err) {

            console.error(err);

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

            return;

        }


        try {

            await deleteAllTasks(
                user.uid
            );

            setTasks([]);


        } catch (err) {

            console.error(err);

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