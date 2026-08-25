import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import TaskForm from "../components/TaskForm";
import TaskStats from "../components/TaskStats";
import SearchBar from "../components/SearchBar";
import DateFilter from "../components/DateFilter";
import TaskSort from "../components/TaskSort";
import TaskFilter from "../components/TaskFilter";
import TaskList from "../components/TaskList";


function Tasks({
    tasks,
    allTasks,
    onAddTask,
    editingTask,
    onUpdateTask,
    onEditTask,
    onToggleTask,
    onDeleteTask,
    onDeleteAllTasks,
}) {

    // ========================
    // Query Parameters
    // ========================

    const [searchParams, setSearchParams] =
        useSearchParams();


    // ========================
    // Local Search / Date
    // ========================

    const [search, setSearch] =
        useState("");

    const [searchDate, setSearchDate] =
        useState("");


    // ========================
    // Read Query Parameters
    // ========================

    const filter =
        searchParams.get("filter") || "all";

    const sortBy =
        searchParams.get("sort") || "due-date";


    // ========================
    // Filter Query Parameter
    // ========================

    const setFilter = (value) => {

        const params =
            new URLSearchParams(searchParams);


        if (value === "all") {

            params.delete("filter");

        } else {

            params.set("filter", value);

        }


        setSearchParams(params);
    };


    // ========================
    // Sort Query Parameter
    // ========================

    const setSortBy = (value) => {

        const params =
            new URLSearchParams(searchParams);


        if (value === "due-date") {

            params.delete("sort");

        } else {

            params.set("sort", value);

        }


        setSearchParams(params);
    };


    // ========================
    // Filter Tasks
    // ========================

    const filteredTasks = tasks
        .filter((task) => {

            if (filter === "completed") {

                return task.completed;

            }


            if (filter === "active") {

                return !task.completed;

            }


            return true;

        })


        .filter((task) => {

            const title =
                (task.title || "").toLowerCase();


            const matchesSearch =
                title.includes(
                    search.toLowerCase()
                );


            const matchesDate =
                !searchDate ||
                task.dueDate === searchDate;


            return (
                matchesSearch &&
                matchesDate
            );

        });


    // ========================
    // Priority Values
    // ========================

    const priorityValue = {
        high: 3,
        medium: 2,
        low: 1,
    };


    // ========================
    // Sort Tasks
    // ========================

    const sortedTasks = [...filteredTasks];


    sortedTasks.sort((a, b) => {

        if (sortBy === "priority-desc") {

            return (
                priorityValue[
                    b.priority || "medium"
                ] -
                priorityValue[
                    a.priority || "medium"
                ]
            );

        }


        if (sortBy === "priority-asc") {

            return (
                priorityValue[
                    a.priority || "medium"
                ] -
                priorityValue[
                    b.priority || "medium"
                ]
            );

        }


        if (sortBy === "az") {

            return (
                (a.title || "").localeCompare(
                    b.title || ""
                )
            );

        }


        if (sortBy === "za") {

            return (
                (b.title || "").localeCompare(
                    a.title || ""
                )
            );

        }


        // Default: due date

        if (sortBy === "due-date") {

            if (!a.dueDate && !b.dueDate) {
                return 0;
            }

            if (!a.dueDate) {
                return 1;
            }

            if (!b.dueDate) {
                return -1;
            }

            return (
                new Date(a.dueDate) -
                new Date(b.dueDate)
            );

        }


        return 0;

    });


    // ========================
    // Render
    // ========================

    return (

        <div className="tasks-page">


            {/* ========================
                Header
            ======================== */}

            <div className="tasks-header">

                <h1>
                    ✅ My Tasks
                </h1>

                <p>
                    Organize your day and stay focused.
                </p>

            </div>


            {/* ========================
                Create / Edit Task
            ======================== */}

            <section className="task-create-card">

                <div className="section-header">

                    <h2>

                        {editingTask
                            ? "✏️ Edit Task"
                            : "✨ Create New Task"}

                    </h2>


                    <p>

                        {editingTask
                            ? "Update your task and save changes."
                            : "Turn your ideas into accomplishments."}

                    </p>

                </div>


                <TaskForm

                    key={
                        editingTask?.id ||
                        "new"
                    }

                    onAddTask={onAddTask}

                    editingTask={editingTask}

                    onUpdateTask={onUpdateTask}

                    allTasks={tasks}

                    onClose={() =>
                        onEditTask(null)
                    }

                />

            </section>


            {/* ========================
                Task Statistics
            ======================== */}

            <section className="task-stats-card">

                <TaskStats

                    tasks={
                        allTasks || tasks
                    }

                    onDeleteAllTasks={
                        onDeleteAllTasks
                    }

                />

            </section>


            {/* ========================
                Task Controls
            ======================== */}

            <section className="task-control-card">


                <SearchBar

                    search={search}

                    setSearch={setSearch}

                />


                <DateFilter

                    searchDate={searchDate}

                    setSearchDate={
                        setSearchDate
                    }

                />


                <TaskSort

                    sortBy={sortBy}

                    setSortBy={setSortBy}

                />


                <TaskFilter

                    filter={filter}

                    setFilter={setFilter}

                />

            </section>


            {/* ========================
                Task List
            ======================== */}

            <section className="task-list-section">

                <TaskList

                    tasks={sortedTasks}

                    onEditTask={onEditTask}

                    onToggleTask={
                        onToggleTask
                    }

                    onDeleteTask={
                        onDeleteTask
                    }

                />

            </section>


        </div>

    );
}


export default Tasks;