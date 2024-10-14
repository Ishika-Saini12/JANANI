// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

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

let addbtn = document.getElementById("addbtn");
let ven_signup_btn=document.getElementById("addvbtn");

function addudata() {
    // Get values from input fields
    let name = document.getElementById("name").value;
    let uid = document.getElementById("uid").value;
    let gmail = document.getElementById("gmail").value;
    let phone_no1 = document.getElementById("phone_no").value;
    let password1 = document.getElementById("password1").value;

    // Save data to Firebase
    set(ref(db, 'Users/' + name), {
        userDetails: { firstname: name, user_id: uid, email: gmail ,phone_no:phone_no1,password:password1}
    })
    .then(() => {
        alert("Data added successfully!");
    })
    .catch((error) => {
        alert("Error adding data.");
        console.error(error);
    });
}
function addvdata() {
    // Get values from input fields
    let ename = document.getElementById("ename").value;
    let vname = document.getElementById("vname").value;
    let urn = document.getElementById("urn").value;
    let vgmail = document.getElementById("vgmail").value;
    let gst_no = document.getElementById("gst_no").value;
    let vphone_no = document.getElementById("vphone_no").value;
    let vpassword = document.getElementById("vpassword").value;

    // Save data to Firebase
    set(ref(db, 'Vendors/' + ename), {
        vendorsDetails: { enterprise_name: ename, name: vname,urn_no:urn, email: vgmail ,gst_no:gst_no,phone_no:vphone_no,password:vpassword}
    })
    .then(() => {
        alert("Data added successfully!");
    })
    .catch((error) => {
        alert("Error adding data.");
        console.error(error);
    });
}

// Add event listener for the add button
if (addbtn) {
    addbtn.addEventListener('click', addudata);
}

if (ven_signup_btn) {
    ven_signup_btn.addEventListener('click', addvdata);
}
