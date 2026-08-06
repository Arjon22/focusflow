import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";

import { db } from "./config";

// Add a new task

export async function deleteAllTasks(userId) {
    const q = query(
        collection(db, "tasks"),
        where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    const deletePromises = snapshot.docs.map((document) =>
        deleteDoc(doc(db, "tasks", document.id))
    );

    await Promise.all(deletePromises);
}
export async function addTask(userId, task) {

    const docRef = await addDoc(
        collection(db, "tasks"), {
            ...task,
            userId,
            createdAt: Date.now(),
        }
    );


    return docRef.id;
}


// Get all tasks for a user
export async function getTasks(userId) {
    const q = query(
        collection(db, "tasks"),
        where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((document) => ({
        firestoreId: document.id,
        ...document.data(),
    }));
}

// Delete a task
export async function deleteTask(taskId) {
    await deleteDoc(doc(db, "tasks", taskId));
}

// Update a task
export async function updateTask(taskId, updates) {
    await updateDoc(doc(db, "tasks", taskId), updates);
}