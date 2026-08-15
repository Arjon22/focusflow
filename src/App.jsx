
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";


import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";


import Navbar from "./components/Navbar";
import Leaves from "./components/Leaves";
import ReminderChecker from "./components/ReminderChecker";
import LoadingScreen from "./components/LoadingScreen";


import useTasks from "./hooks/useTasks";


import "./styles/header.css";
import "./styles/layout.css";
import "./styles/task.css";
import "./styles/dashboard.css";
import "./styles/home.css";
import "./styles/calendar.css";
import "./styles/navigation.css";
import "./styles/settings.css";


function App() {

    const [editingTask, setEditingTask] =
        useState(null);


    const {
        user,
        tasks,
        loading,

        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        deleteAllTasks,

    } = useTasks();


    if (loading) {
        return <LoadingScreen />;
    }


    return (

        <BrowserRouter>

            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 2500,

                    style: {
                        borderRadius: "14px",
                        background: "#ffffff",
                        color: "#222",
                        boxShadow:
                            "0 10px 25px rgba(0,0,0,.12)",
                        padding: "14px 18px",
                        fontSize: "15px",
                        fontWeight: "500",
                    },

                    success: {
                        iconTheme: {
                            primary: "#4CAF50",
                            secondary: "#fff",
                        },
                    },

                    error: {
                        iconTheme: {
                            primary: "#F44336",
                            secondary: "#fff",
                        },
                    },
                }}
            />


            <Leaves />


            <Navbar />


            <main className="main-content">


                <ReminderChecker
                    tasks={tasks}
                    onReminderUpdate={updateTask}
                />


                <Routes>


                    {/* Home */}

                    <Route
                        path="/"
                        element={
                            <Home
                                tasks={tasks}
                            />
                        }
                    />


                    {/* Dashboard */}

                    <Route
                        path="/dashboard"
                        element={
                            <Dashboard
                                tasks={tasks}
                            />
                        }
                    />


                    {/* Tasks */}

                    <Route
                        path="/tasks"
                        element={

                            <Tasks

                                tasks={tasks}

                                allTasks={tasks}


                                onAddTask={
                                    addTask
                                }


                                editingTask={
                                    editingTask
                                }


                                onDeleteAllTasks={
                                    deleteAllTasks
                                }


                                onUpdateTask={
                                    (taskOrId, updates, silent = false) => {

                                        // Reminder update
                                        if (
                                            typeof taskOrId === "string"
                                        ) {

                                            updateTask(
                                                taskOrId,
                                                updates,
                                                silent
                                            );

                                            return;
                                        }


                                        // Normal task edit

                                        updateTask(
                                            taskOrId.id,
                                            taskOrId
                                        );

                                        setEditingTask(null);

                                    }
                                }


                                onEditTask={
                                    setEditingTask
                                }


                                onToggleTask={
                                    (task) => {
                                        toggleTask(task);
                                    }
                                }


                                onDeleteTask={
                                    (id) => {
                                        deleteTask(id);
                                    }
                                }

                            />

                        }
                    />


                    {/* Calendar */}

                    <Route
                        path="/calendar"
                        element={
                            <Calendar
                                tasks={tasks}
                                onAddTask={addTask}
                            />
                        }
                    />


                    {/* Settings */}

                    <Route
                        path="/settings"
                        element={
                            <Settings
                                user={user}
                            />
                        }
                    />
                    <Route
    path="/login"
    element={<Login />}
/>

<Route
    path="/register"
    element={<Register />}
/>


                </Routes>

            </main>

        </BrowserRouter>
    );
}


export default App;
