import ReminderManager from "../components/ReminderManager";


function Settings() {

  return (
    <div className="settings-page">

      <h1>
        ⚙️ Settings
      </h1>

      <p>
        Manage your FocusFlow preferences.
      </p>


      <section className="settings-card">

        <h2>
          🔔 Notifications
        </h2>

        <p>
          Enable reminders for your upcoming tasks.
        </p>


        <ReminderManager />


      </section>


    </div>
  );
}


export default Settings;