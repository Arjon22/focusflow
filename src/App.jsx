import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

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
  const updatedTasks = tasks.map((task) =>
    task.id === editingTaskId
      ? { ...task, title: editingText }
      : task
  );

  setTasks(updatedTasks);
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
    <div className="app">
      <Header />
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
  tasks={tasks}
  onToggleTask={handleToggleTask}
  onEditClick={handleEditClick}
  editingTaskId={editingTaskId}
  editingText={editingText}
  setEditingText={setEditingText}
  onSaveEdit={handleSaveEdit}
  onDeleteTask={handleDeleteTask}
/>
    </div>
  );
}

export default App;