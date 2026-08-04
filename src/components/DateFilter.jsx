import { useRef } from "react";

function DateFilter({ searchDate, setSearchDate }) {

  const dateRef = useRef(null);

  const formattedDate = searchDate
    ? new Date(searchDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Filter tasks by date";


  return (
    <div className="date-filter">

      <div
        className="date-filter-button"
        onClick={() => dateRef.current.showPicker()}
      >

        <span className="calendar-icon">
          📅
        </span>


        <span>
          {formattedDate}
        </span>


        {searchDate && (
          <button
            className="clear-date"
            onClick={(e) => {
              e.stopPropagation();
              setSearchDate("");
            }}
          >
            ✕
          </button>
        )}


        <input
          ref={dateRef}
          type="date"
          value={searchDate}
          onChange={(event) =>
            setSearchDate(event.target.value)
          }
        />

      </div>

    </div>
  );
}

export default DateFilter;