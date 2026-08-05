import CalendarView from "../components/CalendarView";

function Calendar() {
  return (
    <div className="calendar-page">
      <div className="section-header">
        <h1>📅 Calendar</h1>
        <p>View and manage your upcoming tasks.</p>
      </div>

      <CalendarView />
    </div>
  );
}

export default Calendar;