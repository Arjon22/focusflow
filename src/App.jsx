import Header from "./components/Header";
import TaskForm from "./components/TaskForm";

function App() {
  const handleAddTask = (task) => {
    console.log(task);
  };

  return (
    <div className="app">
      <Header />
      <TaskForm onAddTask={handleAddTask} />
    </div>
  );
}

export default App;