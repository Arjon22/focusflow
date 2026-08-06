import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  updateTask as updateTaskInFirestore,
  deleteTask as deleteTaskFromFirestore
} from "./firebase/tasks";
import { auth } from "./firebase/auth";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";

import Navbar from "./components/Navbar";
import Leaves from "./components/Leaves";
import ReminderChecker from "./components/ReminderChecker";

import "./styles/header.css";
import "./styles/layout.css";
import "./styles/task.css";
import "./styles/dashboard.css";
import "./styles/home.css";
import "./styles/calendar.css";
import "./styles/navigation.css";
import "./styles/settings.css";

import useTasks from "./hooks/useTasks";


function App() {
  const {
  tasks,
  setTasks,
  handleAddTask,
} = useTasks();

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("due-date");
  const [searchDate, setSearchDate] = useState("");


  const handleEditClick = (id) => {
    const task = tasks.find((task) => task.id === id);

    setEditingTaskId(id);
    setEditingText(task.title);
  };

  const handleSaveEdit = async () => {

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


  const task = tasks.find(
    (task) => task.id === editingTaskId
  );


  const updatedTasks = tasks.map((task) =>
    task.id === editingTaskId
      ? {
          ...task,
          title: trimmedTitle,
        }
      : task
  );


  setTasks(updatedTasks);


  if (
    auth.currentUser &&
    task?.firestoreId
  ) {

    try {

      await updateTaskInFirestore(
        task.firestoreId,
        {
          title: trimmedTitle,
        }
      );

    } catch (error) {

      console.error(
        "Update failed:",
        error
      );

    }

  }


  setEditingTaskId(null);
  setEditingText("");

};

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingText("");
  };

  const handleDeleteTask = async (id) => {

  const task = tasks.find(
    (task) => task.id === id
  );
  console.log("Deleting task:", task);



  const updatedTasks = tasks.filter(
    (task) => task.id !== id
  );


  setTasks(updatedTasks);


  if (
    auth.currentUser &&
    task?.firestoreId
  ) {

    try {

      await deleteTaskFromFirestore(
        task.firestoreId
      );

    } catch (error) {

      console.error(
        "Delete failed:",
        error
      );

    }

  }

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

  const handleToggleTask = async (id) => {

  const task = tasks.find(
    (task) => task.id === id
  );


  if (!task) return;


  const updatedStatus = !task.completed;


  const updatedTasks = tasks.map((task) =>
    task.id === id
      ? {
          ...task,
          completed: updatedStatus,
        }
      : task
  );


  setTasks(updatedTasks);


  if (
    auth.currentUser &&
    task.firestoreId
  ) {

    try {

      await updateTaskInFirestore(
        task.firestoreId,
        {
          completed: updatedStatus,
        }
      );


    } catch (error) {

      console.error(
        "Toggle update failed:",
        error
      );

    }

  }

};

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

  <ReminderChecker tasks={tasks} />

  
    

    <Routes>
      <Route
  path="/"
  element={<Home tasks={tasks} />}
/>

      

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
     <Route
  path="/calendar"
  element={
    <Calendar
      tasks={tasks}
      onAddTask={handleAddTask}
    />
  }
/>

<Route
  path="/settings"
  element={<Settings />}
/>

    </Routes>

  </main>

</BrowserRouter>
);
}

export default App;