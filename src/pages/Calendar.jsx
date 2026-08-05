import CalendarView from "../components/CalendarView";

function Calendar({ tasks }) {
  return (
    <div className="calendar-page">
      <div className="section-header">
        <h1>📅 Calendar</h1>
        <p>View and manage your upcoming tasks.</p>
      </div>

      <CalendarView tasks={tasks} />
    </div>
  );
}

export default Calendar;