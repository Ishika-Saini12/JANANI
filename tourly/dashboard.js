// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import { get, child } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkzHf05aQOXi0c9RkShCR3_3tyhnZRs6E",
    authDomain: "practice-a02a6.firebaseapp.com",
    databaseURL: "https://practice-a02a6-default-rtdb.firebaseio.com",
    projectId: "practice-a02a6",
    storageBucket: "practice-a02a6.appspot.com",
    messagingSenderId: "396754868625",
    appId: "1:396754868625:web:c40e5807cb5d5cd15de230"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);




