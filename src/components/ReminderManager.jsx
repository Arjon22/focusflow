import { useState } from "react";

function ReminderManager() {

  const [permission, setPermission] = useState(
    Notification.permission
  );


  const enableNotifications = async () => {

    const result = await Notification.requestPermission();

    setPermission(result);

  };


  const sendTestNotification = () => {

    if (Notification.permission === "granted") {

      new Notification("FocusFlow Reminder 🔔", {
        body: "This is a test notification.",
      });

    }

  };


  return (
    <div className="reminder-manager">

      {permission !== "granted" && (

        <button
          onClick={enableNotifications}
        >
          🔔 Enable Reminders
        </button>

      )}


      {permission === "granted" && (

        <>
          <p>
            ✅ Notifications enabled
          </p>

          <button
            onClick={sendTestNotification}
          >
            🔔 Test Notification
          </button>

        </>

      )}

    </div>
  );
}

export default ReminderManager;