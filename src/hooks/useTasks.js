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
    // Load Tasks
    // ------------------------

    const loadTasks = async(uid) => {
        setLoading(true);

        try {
            const data = await getTasks(uid);
            setTasks(data);
        } catch (err) {
            console.error("Failed to load tasks:", err);
        }

        setLoading(false);
    };

    const removeAllTasks = async() => {
        if (!user) return;

        try {
            await deleteAllTasks(user.uid);
            setTasks([]);
        } catch (err) {
            console.error(err);
        }
    };

    // ------------------------
    // Auth Listener
    // ------------------------

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                await loadTasks(currentUser.uid);
            } else {
                setTasks([]);
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    // ------------------------
    // Add Task
    // ------------------------

    const createTask = async(task) => {
        if (!user) return;

        try {
            const id = await addTask(user.uid, task);

            setTasks((prev) => [
                ...prev,
                {
                    ...task,
                    firestoreId: id,
                },
            ]);

        } catch (err) {
            console.error(err);
        }
    };

    // ------------------------
    // Update Task
    // ------------------------

    const editTask = async(id, updates) => {
        if (!user) return;

        try {
            await updateTask(id, updates);

            setTasks((prev) =>
                prev.map((task) =>
                    task.firestoreId === id ? {
                        ...task,
                        ...updates,
                    } :
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
        if (!user) return;

        try {
            await deleteTask(id);

            setTasks((prev) =>
                prev.filter(
                    (task) => task.firestoreId !== id
                )
            );

        } catch (err) {
            console.error(err);
        }
    };

    // ------------------------
    // Toggle Complete
    // ------------------------

    const toggleTask = async(task) => {
        await editTask(task.firestoreId, {
            completed: !task.completed,
        });
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

        refresh: () => user && loadTasks(user.uid),
    };
}