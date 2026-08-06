import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";

import Navbar from "./components/Navbar";
import Leaves from "./components/Leaves";
import ReminderChecker from "./components/ReminderChecker";

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

  const [editingTask, setEditingTask] = useState(null);


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
    return (
      <div className="loading-screen">
        <h2>Loading...</h2>
      </div>
    );
  }



  return (

    <BrowserRouter>

      <Leaves />

      <Navbar />


      <main className="main-content">


        <ReminderChecker tasks={tasks} />


        <Routes>


          <Route
            path="/"
            element={
              <Home
                tasks={tasks}
              />
            }
          />



          <Route
            path="/dashboard"
            element={
              <Dashboard
                tasks={tasks}
              />
            }
          />



          <Route
            path="/tasks"
            element={

              <Tasks
  tasks={tasks}
  allTasks={tasks}

  onAddTask={addTask}

  editingTask={editingTask}

  onDeleteAllTasks={deleteAllTasks}

  onUpdateTask={async(updatedTask)=>{

  await updateTask(
    updatedTask.firestoreId || updatedTask.id,
    updatedTask
  );

  setEditingTask(null);

}}

  onEditTask={setEditingTask}

  onToggleTask={async (task) => {
    await toggleTask(task);
  }}

  onDeleteTask={async (id) => {
    await deleteTask(id);
  }}
/>

            }
          />



          <Route
            path="/calendar"
            element={
              <Calendar

                tasks={tasks}

                onAddTask={addTask}

              />
            }
          />



          <Route
            path="/settings"
            element={
              <Settings

                user={user}

              />
            }
          />



        </Routes>


      </main>


    </BrowserRouter>

  );

}


export default App;