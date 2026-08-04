
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
  onToggleTask,
  onEditClick,
  editingTaskId,
  editingText,
  setEditingText,
  onSaveEdit,
  onDeleteTask,
  onCancelEdit,
  onDeleteAllTasks,
  filter,
  setFilter,
  search,
  setSearch,
  sortBy,
  setSortBy,
  searchDate,
  setSearchDate,
}) {
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
    <h2>✨ Create New Task</h2>
    <p>
      Turn your ideas into accomplishments.
    </p>
  </div>

  <TaskForm
    onAddTask={onAddTask}
  />

</section>



    <section className="task-stats-card">

      <TaskStats
        tasks={allTasks}
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
        tasks={tasks}
        onToggleTask={onToggleTask}
        onEditClick={onEditClick}
        editingTaskId={editingTaskId}
        editingText={editingText}
        setEditingText={setEditingText}
        onSaveEdit={onSaveEdit}
        onDeleteTask={onDeleteTask}
        onCancelEdit={onCancelEdit}
      />

    </section>


  </div>
);
}

export default Tasks;