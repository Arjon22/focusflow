// Current local date & time
export function getNow() {
    return new Date();
}

// Current local date (YYYY-MM-DD)
export function getToday() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

// Is task due today?
export function isToday(dueDate) {
    return dueDate === getToday();
}

// Is task overdue?
export function isOverdue(dueDate, completed = false) {
    if (!dueDate || completed) return false;

    return dueDate < getToday();
}