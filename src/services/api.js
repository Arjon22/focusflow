const API_BASE_URL = "http://127.0.0.1:8000";


// ========================
// Generic API Request
// ========================

const apiRequest = async(
    endpoint,
    options = {}
) => {

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            ...options,
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail ||
            data.message ||
            "Something went wrong."
        );
    }

    return data;
};


// ========================
// Authentication
// ========================

export const registerUser = (
    email,
    password
) => {

    return apiRequest(
        "/auth/register", {
            method: "POST",

            body: JSON.stringify({
                email,
                password,
            }),
        }
    );
};


export const loginUser = (
    email,
    password
) => {

    return apiRequest(
        "/auth/login", {
            method: "POST",

            body: JSON.stringify({
                email,
                password,
            }),
        }
    );
};


// ========================
// Tasks
// ========================

export const getTasks = (
    userId
) => {

    return apiRequest(
        `/tasks/?user_id=${userId}`
    );
};


export const createTask = (
    userId,
    task
) => {

    return apiRequest(
        `/tasks/?user_id=${userId}`, {
            method: "POST",

            body: JSON.stringify(task),
        }
    );
};


export const updateTask = (
    userId,
    taskId,
    updates
) => {

    return apiRequest(
        `/tasks/${taskId}?user_id=${userId}`, {
            method: "PUT",

            body: JSON.stringify(updates),
        }
    );
};


export const deleteTask = (
    userId,
    taskId
) => {

    return apiRequest(
        `/tasks/${taskId}?user_id=${userId}`, {
            method: "DELETE",
        }
    );
};