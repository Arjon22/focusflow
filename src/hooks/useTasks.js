import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/useAuth";

const normalizeTask = (task) => {
    const createdAt =
        task.createdAt ||
        new Date().toISOString();

    return {
        ...task,

        id: task.id ||
            Date.now().toString(),

        priority: task.priority || "medium",

        dueDate: task.dueDate || "",

        dueTime: task.dueTime || "",

        reminder: task.reminder || "none",

        repeat: task.repeat || "none",

        notes: task.notes || "",

        completed: task.completed || false,

        reminded: task.reminded || false,

        createdAt,

        updatedAt: task.updatedAt ||
            createdAt,
    };
};


// ========================
// Get Tasks From LocalStorage
// ========================

const getTasksFromStorage = (userId) => {
    if (!userId) {
        return [];
    }

    const key =
        `focusflow_tasks_${userId}`;

    const saved =
        localStorage.getItem(key);

    if (!saved) {
        return [];
    }

    try {
        const parsed =
            JSON.parse(saved);

        return parsed.map(normalizeTask);

    } catch (error) {
        console.error(
            "Failed to parse tasks:",
            error
        );

        return [];
    }
};


// ========================
// Hook
// ========================

export default function useTasks() {

    const { user } = useAuth();

    const [tasks, setTasks] =
    useState(() =>
        getTasksFromStorage(
            user && user.id
        )
    );


    // ========================
    // Save Tasks
    // ========================

    const saveTasks = (newTasks) => {

        if (!user) {
            return;
        }

        const key =
            `focusflow_tasks_${user.id}`;

        localStorage.setItem(
            key,
            JSON.stringify(newTasks)
        );
    };


    // ========================
    // Add Task
    // ========================

    const createTask = (task) => {

        if (!user) {
            toast.error(
                "Please sign in first."
            );

            return;
        }

        const now =
            new Date().toISOString();

        const newTask =
            normalizeTask({

                ...task,

                id: Date.now().toString(),

                createdAt: task.createdAt ||
                    now,

                updatedAt: now,
            });


        setTasks((prev) => {

            const updated = [
                ...prev,
                newTask,
            ];

            saveTasks(updated);

            return updated;
        });


        toast.success(
            "Task added."
        );
    };


    // ========================
    // Update Task
    // ========================

    const editTask = (
        id,
        updates,
        silent = false
    ) => {

        if (!user) {
            return;
        }


        setTasks((prev) => {

            const updated =
                prev.map((task) => {

                    if (task.id !== id) {
                        return task;
                    }

                    return {
                        ...task,
                        ...updates,
                        updatedAt: new Date().toISOString(),
                    };
                });


            saveTasks(updated);

            return updated;
        });


        if (!silent) {
            toast.success(
                "Task updated."
            );
        }
    };


    // ========================
    // Delete Task
    // ========================

    const removeTask = (id) => {

        if (!user) {
            return;
        }


        setTasks((prev) => {

            const updated =
                prev.filter(
                    (task) =>
                    task.id !== id
                );


            saveTasks(updated);

            return updated;
        });


        toast.success(
            "Task deleted."
        );
    };


    // ========================
    // Delete All Tasks
    // ========================

    const removeAllTasks = () => {

        if (!user) {
            return;
        }


        const key =
            `focusflow_tasks_${user.id}`;


        localStorage.removeItem(key);

        setTasks([]);


        toast.success(
            "All tasks deleted."
        );
    };


    // ========================
    // Toggle Task
    // ========================

    const toggleTask = (task) => {

        editTask(
            task.id, {
                completed:
                    !task.completed,
            }
        );
    };


    // ========================
    // Refresh
    // ========================

    const refresh = () => {

        const loadedTasks =
            getTasksFromStorage(
                user && user.id
            );

        setTasks(loadedTasks);
    };


    // ========================
    // Return
    // ========================

    return {

        user,

        tasks,

        loading: false,

        addTask: createTask,

        updateTask: editTask,

        deleteTask: removeTask,

        deleteAllTasks: removeAllTasks,

        toggleTask,

        refresh,
    };
}