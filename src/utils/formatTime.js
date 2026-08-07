function formatTime(time) {

    if (!time) return "";

    const [hours, minutes] = time.split(":");


    const date = new Date();

    date.setHours(hours);
    date.setMinutes(minutes);


    return date.toLocaleTimeString(
        "en-US", {
            hour: "numeric",
            minute: "2-digit",
        }
    );

}


export default formatTime;