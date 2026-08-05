function CalendarView() {
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button>◀</button>

        <h2>August 2026</h2>

        <button>▶</button>
      </div>

      <div className="calendar-grid">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
    </div>
  );
}

export default CalendarView;