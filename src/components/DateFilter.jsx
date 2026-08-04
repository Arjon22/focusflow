function DateFilter({ searchDate, setSearchDate }) {
  return (
    <div className="date-filter">
      <input
        type="date"
        value={searchDate}
        onChange={(event) =>
          setSearchDate(event.target.value)
        }
      />
    </div>
  );
}

export default DateFilter;