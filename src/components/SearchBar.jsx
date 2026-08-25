function SearchBar({ search, setSearch }) {

  return (

    <div className="search-container">

      <span className="search-icon">
        🔍
      </span>

      <input
        className="search-input"
        type="text"
        placeholder="Search your tasks..."
        value={search}
        onChange={(e)=>
          setSearch(e.target.value)
        }
      />

    </div>

  );
}

export default SearchBar;