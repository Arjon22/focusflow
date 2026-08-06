import { useState } from "react";

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

  console.log("ADD FUNCTION:", onAddTask);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("due-date");
  const [searchDate, setSearchDate] = useState("");


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
    .filter((task)=>{

      const title =
        (task.title || "")
        .toLowerCase();


      const matchesSearch =
        title.includes(
          search.toLowerCase()
        );


      const matchesDate =
        !searchDate ||
        task.dueDate === searchDate;


      return matchesSearch && matchesDate;

    });



  const priorityValue = {
    high:3,
    medium:2,
    low:1
  };


  const sortedTasks = [...filteredTasks];


  sortedTasks.sort((a,b)=>{

    if(sortBy==="priority-desc"){
      return (
        priorityValue[b.priority || "medium"] -
        priorityValue[a.priority || "medium"]
      );
    }


    if(sortBy==="priority-asc"){
      return (
        priorityValue[a.priority || "medium"] -
        priorityValue[b.priority || "medium"]
      );
    }


    if(sortBy==="az"){
      return (
        (a.title || "")
        .localeCompare(
          b.title || ""
        )
      );
    }


    if(sortBy==="za"){
      return (
        (b.title || "")
        .localeCompare(
          a.title || ""
        )
      );
    }


    return 0;

  });



  return (

    <div className="tasks-page">


      <div className="tasks-header">

        <h1>
          ✅ My Tasks
        </h1>

        <p>
          Organize your day and stay focused.
        </p>

      </div>



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
  onAddTask={onAddTask}
  editingTask={editingTask}
  onUpdateTask={onUpdateTask}
  allTasks={tasks}
  onClose={() => onEditTask(null)}
/>


      </section>



      <section className="task-stats-card">

        <TaskStats
  tasks={allTasks || tasks}
  onDeleteAllTasks={onDeleteAllTasks}
/>

      </section>




      <section className="task-control-card">


        <SearchBar
          search={search}
          setSearch={setSearch}
        />


        <DateFilter
          searchDate={searchDate}
          setSearchDate={setSearchDate}
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




      <section className="task-list-section">


        <TaskList

          tasks={sortedTasks}

          onEditTask={onEditTask}

          onToggleTask={onToggleTask}

          onDeleteTask={onDeleteTask}

        />


      </section>


    </div>

  );

}


export default Tasks;