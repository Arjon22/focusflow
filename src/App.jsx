import { useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAddTask = (taskTitle) => {
  const newTask = {
    id: Date.now(),
    title: taskTitle,
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
  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updatedTasks);
  };

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
/>
    </div>
  );
}

export default App;