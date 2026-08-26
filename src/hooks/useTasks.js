import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/useAuth";

import {
    getTasks as getTasksFromAPI,
    createTask as createTaskAPI,
    updateTask as updateTaskAPI,
    deleteTask as deleteTaskAPI,
} from "../services/api";


// ========================
// Hook
// ========================

export default function useTasks() {

    const { user } = useAuth();

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(false);


    // ========================
    // Load Tasks
    // ========================

    const refresh = async() => {

        if (!user) {
            setTasks([]);
            return;
        }

        try {

            setLoading(true);

            const loadedTasks =
                await getTasksFromAPI(user.id);

            setTasks(loadedTasks);

        } catch (error) {

            console.error(
                "Failed to load tasks:",
                error
            );

            toast.error(
                "Failed to load tasks."
            );

        } finally {

            setLoading(false);
        }
    };


    // ========================
    // Load Tasks When User Changes
    // ========================

    useEffect(() => {

        refresh();

    }, [user && user.id]);


    // ========================
    // Add Task
    // ========================

    const addTask = async(task) => {

        if (!user) {

            toast.error(
                "Please sign in first."
            );

            return;
        }

        try {

            const newTask =
                await createTaskAPI(
                    user.id,
                    task
                );

            setTasks((prev) => [
                ...prev,
                newTask,
            ]);

            toast.success(
                "Task added."
            );

            return newTask;

        } catch (error) {

            console.error(
                "Failed to create task:",
                error
            );

            toast.error(
                error.message ||
                "Failed to add task."
            );
        }
    };


    // ========================
    // Update Task
    // ========================

    const updateTask = async(
        id,
        updates,
        silent = false
    ) => {

        if (!user) {
            return;
        }

        try {

            const updatedTask =
                await updateTaskAPI(
                    user.id,
                    id,
                    updates
                );

            setTasks((prev) =>
                prev.map((task) =>
                    task.id === id ?
                    updatedTask :
                    task
                )
            );

            if (!silent) {

                toast.success(
                    "Task updated."
                );
            }

            return updatedTask;

        } catch (error) {

            console.error(
                "Failed to update task:",
                error
            );

            toast.error(
                error.message ||
                "Failed to update task."
            );
        }
    };


    // ========================
    // Delete Task
    // ========================

    const deleteTask = async(id) => {

        if (!user) {
            return;
        }

        try {

            await deleteTaskAPI(
                user.id,
                id
            );

            setTasks((prev) =>
                prev.filter(
                    (task) =>
                    task.id !== id
                )
            );

            toast.success(
                "Task deleted."
            );

        } catch (error) {

            console.error(
                "Failed to delete task:",
                error
            );

            toast.error(
                error.message ||
                "Failed to delete task."
            );
        }
    };


    // ========================
    // Delete All Tasks
    // ========================

    const deleteAllTasks = async() => {

        if (!user) {
            return;
        }

        try {

            const currentTasks = [
                ...tasks,
            ];

            await Promise.all(
                currentTasks.map(
                    (task) =>
                    deleteTaskAPI(
                        user.id,
                        task.id
                    )
                )
            );

            setTasks([]);

            toast.success(
                "All tasks deleted."
            );

        } catch (error) {

            console.error(
                "Failed to delete all tasks:",
                error
            );

            toast.error(
                "Failed to delete all tasks."
            );

            await refresh();
        }
    };


    // ========================
    // Toggle Task
    // ========================

    const toggleTask = async(task) => {

        await updateTask(
            task.id, {
                completed:
                    !task.completed,
            }
        );
    };


    // ========================
    // Return
    // ========================

    return {

        user,

        tasks,

        loading,

        addTask,

        updateTask,

        deleteTask,

        deleteAllTasks,

        toggleTask,

        refresh,
    };
}