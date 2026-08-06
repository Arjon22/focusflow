import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBDWDkxUeKjw-jcwRZ_X4twf5vLM0pf-3I",
    authDomain: "focusflow-96a2f.firebaseapp.com",
    projectId: "focusflow-96a2f",
    storageBucket: "focusflow-96a2f.firebasestorage.app",
    messagingSenderId: "59036566310",
    appId: "1:59036566310:web:ea586a0234196f3a64f7e7",
    measurementId: "G-KNHFKNWJ5N"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export default app;