function TaskSort({ sortBy, setSortBy }) {
  return (
    <div className="task-sort">
      <label htmlFor="sort">
        Sort by
      </label>

      <select
        id="sort"
        value={sortBy}
        onChange={(event) =>
          setSortBy(event.target.value)
        }
      >
        <option value="due-date">Due Date</option>

<option value="priority-desc">
  Priority (High → Low)
</option>

<option value="priority-asc">
  Priority (Low → High)
</option>

<option value="az">A → Z</option>

<option value="za">Z → A</option>

<option value="newest">Newest</option>

<option value="oldest">Oldest</option>
      </select>
    </div>
  );
}

export default TaskSort;