import { useState, useEffect } from "react";

import { auth } from "../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import {
    addTask as addTaskToFirestore,
    getTasks,
} from "../firebase/tasks";


export default function useTasks() {

    const [tasks, setTasks] = useState(() => {

        const savedTasks = localStorage.getItem("tasks");

        if (!savedTasks) {
            return [];
        }

        return JSON.parse(savedTasks).map((task) => ({
            ...task,
            priority: task.priority || "medium",
            dueDate: task.dueDate || "",
            dueTime: task.dueTime || "",
            reminder: task.reminder || "none",
            repeat: task.repeat || "none",
            notes: task.notes || "",
        }));

    });


    // Save tasks locally
    useEffect(() => {

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

    }, [tasks]);



    // Load Firestore tasks after login
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(
            auth,
            async(user) => {

                if (!user) {
                    return;
                }

                try {

                    const firestoreTasks = await getTasks(user.uid);


                    setTasks((currentTasks) => {

                        const mergedTasks = [
                            ...firestoreTasks,
                            ...currentTasks.filter(
                                localTask =>
                                !firestoreTasks.some(
                                    cloudTask =>
                                    cloudTask.title.toLowerCase() ===
                                    localTask.title.toLowerCase()
                                )
                            )
                        ];


                        return mergedTasks;

                    });

                } catch (error) {

                    console.error(
                        "Failed to load tasks:",
                        error
                    );

                }

            }
        );


        return () => unsubscribe();

    }, []);



    const handleAddTask = (
        taskTitle,
        priority,
        dueDate,
        dueTime,
        reminder,
        repeat,
        notes
    ) => {

        const trimmedTitle = taskTitle.trim();


        if (!trimmedTitle) {
            alert("Task cannot be empty.");
            return;
        }


        const taskExists = tasks.some(
            (task) =>
            task.title.trim().toLowerCase() ===
            trimmedTitle.toLowerCase()
        );


        if (taskExists) {
            alert(`"${trimmedTitle}" already exists.`);
            return;
        }


        const newTask = {

            id: Date.now(),

            title: trimmedTitle,

            completed: false,

            priority: priority || "medium",

            dueDate: dueDate || "",

            dueTime: dueTime || "",

            reminder: reminder || "none",

            repeat: repeat || "none",

            notes: notes || "",

        };


        // Update UI immediately
        setTasks((prevTasks) => [
            ...prevTasks,
            newTask,
        ]);



        // Save to Firestore if logged in
        if (auth.currentUser) {

            addTaskToFirestore(
                    auth.currentUser.uid,
                    newTask
                )
                .then((firestoreId) => {
                    console.log("Firestore ID:", firestoreId);


                    setTasks((prevTasks) =>
                        prevTasks.map((task) =>
                            task.id === newTask.id ? {
                                ...task,
                                firestoreId,
                            } :
                            task
                        )
                    );

                })
                .catch(console.error);

        }

    };


    return {

        tasks,

        setTasks,

        handleAddTask,

    };

}