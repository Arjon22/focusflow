function TaskFilter({
  filter,
  setFilter
}) {

return (

<div className="task-filter">

<button
className={filter==="all" ? "active-filter":""}
onClick={()=>setFilter("all")}
>
All
</button>


<button
className={filter==="active" ? "active-filter":""}
onClick={()=>setFilter("active")}
>
Active
</button>


<button
className={filter==="completed" ? "active-filter":""}
onClick={()=>setFilter("completed")}
>
Completed
</button>


</div>

);

}

export default TaskFilter;