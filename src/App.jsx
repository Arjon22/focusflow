import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";
import Leaves from "./components/Leaves";
import TaskStats from "./components/TaskStats";

function App() {
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");

  return savedTasks ? JSON.parse(savedTasks) : [];
});
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAddTask = (taskTitle) => {
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

  // Prevent empty task names
  if (!trimmedTitle) {
    alert("Task cannot be empty.");
    return;
  }

  // Prevent duplicate task names (except the task being edited)
  const taskExists = tasks.some(
    (task) =>
      task.id !== editingTaskId &&
      task.title.trim().toLowerCase() === trimmedTitle.toLowerCase()
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
  const updatedTasks = tasks.filter((task) => task.id !== id);

  setTasks(updatedTasks);
};
  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updatedTasks);
  };
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);
  return (
  <>
    <Leaves />

    <div className="app">
      <Header />

      <TaskForm 
  onAddTask={handleAddTask}
/>

<TaskStats tasks={tasks} />

<TaskList
  tasks={tasks}
  onToggleTask={handleToggleTask}
  onEditClick={handleEditClick}
  editingTaskId={editingTaskId}
  editingText={editingText}
  setEditingText={setEditingText}
  onSaveEdit={handleSaveEdit}
  onDeleteTask={handleDeleteTask}
  onCancelEdit={handleCancelEdit}
/>

    </div>
  </>
);
}

export default App;