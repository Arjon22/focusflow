import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";

import Navbar from "./components/Navbar";
import Leaves from "./components/Leaves";

import "./styles/header.css";
import "./styles/layout.css";
import "./styles/task.css";
import "./styles/dashboard.css";
import "./styles/home.css";
import "./styles/calendar.css";
import "./styles/navigation.css";

function App() {
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

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("due-date");
  const [searchDate, setSearchDate] = useState("");

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

    setTasks([...tasks, newTask]);
  };

  const handleEditClick = (id) => {
    const task = tasks.find((task) => task.id === id);

    setEditingTaskId(id);
    setEditingText(task.title);
  };

  const handleSaveEdit = () => {
    const trimmedTitle = editingText.trim();

    if (!trimmedTitle) {
      alert("Task cannot be empty.");
      return;
    }

    const taskExists = tasks.some(
      (task) =>
        task.id !== editingTaskId &&
        task.title.trim().toLowerCase() ===
          trimmedTitle.toLowerCase()
    );

    if (taskExists) {
      alert(`"${trimmedTitle}" already exists.`);
      return;
    }

    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId
        ? { ...task, title: trimmedTitle }
        : task
    );

    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditingText("");
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingText("");
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updatedTasks);
  };

  const handleDeleteAllTasks = () => {
    if (tasks.length === 0) {
      alert("No tasks to delete.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete all tasks?"
    );

    if (confirmDelete) {
      setTasks([]);
    }
  };

  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
          }
        : task
    );

    setTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

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
  const matchesSearch =
    task.title
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesDate =
    !searchDate || task.dueDate === searchDate;

  return matchesSearch && matchesDate;
});
const compareDueDate = (a, b) => {
  if (!a.dueDate && !b.dueDate) return 0;
  if (!a.dueDate) return 1;
  if (!b.dueDate) return -1;

  return new Date(a.dueDate) - new Date(b.dueDate);
};
  const sortedTasks = [...filteredTasks];
  

const priorityValue = {
  high: 3,
  medium: 2,
  low: 1,
};

sortedTasks.sort((a, b) => {
  switch (sortBy) {

    case "due-date": {
      const dueDateDiff = compareDueDate(a, b);

      if (dueDateDiff !== 0) {
        return dueDateDiff;
      }

      return priorityValue[b.priority] - priorityValue[a.priority];
    }

    case "priority-desc": {
      const priorityDiff =
        priorityValue[b.priority] -
        priorityValue[a.priority];

      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      return compareDueDate(a, b);
    }

    case "priority-asc": {
      const priorityDiff =
        priorityValue[a.priority] -
        priorityValue[b.priority];

      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      return compareDueDate(a, b);
    }

    case "az": {
      const nameDiff =
        a.title.localeCompare(b.title);

      if (nameDiff !== 0) {
        return nameDiff;
      }

      return compareDueDate(a, b);
    }

    case "za": {
      const nameDiff =
        b.title.localeCompare(a.title);

      if (nameDiff !== 0) {
        return nameDiff;
      }

      return compareDueDate(a, b);
    }

    case "newest": {
      const newestDiff = b.id - a.id;

      if (newestDiff !== 0) {
        return newestDiff;
      }

      return compareDueDate(a, b);
    }

    case "oldest": {
      const oldestDiff = a.id - b.id;

      if (oldestDiff !== 0) {
        return oldestDiff;
      }

      return compareDueDate(a, b);
    }

    default:
      return 0;
  }
});

  return (
  <BrowserRouter>

  <Leaves />

  <Navbar />

  <main className="main-content">

    <Routes>

      <Route path="/" element={<Home />} />

      <Route
        path="/dashboard"
        element={<Dashboard tasks={tasks} />}
      />

      <Route
        path="/tasks"
        element={
          <Tasks
            tasks={sortedTasks}
            allTasks={tasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onEditClick={handleEditClick}
            editingTaskId={editingTaskId}
            editingText={editingText}
            setEditingText={setEditingText}
            onSaveEdit={handleSaveEdit}
            onDeleteTask={handleDeleteTask}
            onCancelEdit={handleCancelEdit}
            onDeleteAllTasks={handleDeleteAllTasks}
            filter={filter}
            setFilter={setFilter}
            search={search}
            setSearch={setSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
            searchDate={searchDate}
            setSearchDate={setSearchDate}
          />
        }
      />

      <Route path="/calendar" element={<Calendar />} />
      <Route path="/settings" element={<Settings />} />

    </Routes>

  </main>

</BrowserRouter>
);
}

export default App;