import { useState } from "react";

function ReminderManager() {

  const notificationSupported =
    typeof window !== "undefined" &&
    "Notification" in window;

  const [permission, setPermission] = useState(
    notificationSupported
      ? Notification.permission
      : "unsupported"
  );

  const enableNotifications = async () => {

    if (!notificationSupported) {
      return;
    }

    const result = await Notification.requestPermission();

    setPermission(result);

  };

  const sendTestNotification = () => {

    if (
      notificationSupported &&
      Notification.permission === "granted"
    ) {

      new Notification(
        "FocusFlow Reminder 🔔",
        {
          body: "This is a test notification.",
        }
      );

    }

  };

  return (

    <div className="reminder-manager">

      {permission === "unsupported" && (

        <p>
          ⚠️ Browser notifications are not supported on this device or browser.
        </p>

      )}

      {permission !== "granted" &&
        permission !== "unsupported" && (

        <button onClick={enableNotifications}>
          🔔 Enable Reminders
        </button>

      )}

      {permission === "granted" && (

        <>
          <p>
            ✅ Notifications enabled
          </p>

          <button onClick={sendTestNotification}>
            🔔 Test Notification
          </button>
        </>

      )}

    </div>

  );
}

export default ReminderManager;