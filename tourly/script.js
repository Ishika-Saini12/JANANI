// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, set, get, child, push, query, orderByChild } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";



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
let user_data=document.getElementById("retrevebtn");

let dashbtn=document.getElementById("add-destination-btn");

     

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

    // Get reference of input of user fields
    let rename = document.getElementById("ename");
    let rvname = document.getElementById("vname");
    let rurn = document.getElementById("urn");
    let rvgmail = document.getElementById("vgmail");
    let rgst_no = document.getElementById("gst_no");
    let rvphone_no = document.getElementById("vphone_no");
    let rvpassword = document.getElementById("vpassword");

    // Get values from input of venders fields
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

// retreveing data
function retreve_data(){
    // Get reference from input fields
    let rname = document.getElementById("name");
    let ruid = document.getElementById("uid");
    let rgmail = document.getElementById("gmail");
    let rphone_no1 = document.getElementById("phone_no");
    let rpassword1 = document.getElementById("password1");
    const dbref=ref(db);
    // yahan data get karenge wahan set karenge
    get(child(dbref,'Users/' + rname.value)).then((snapshot)=>{
        if(snapshot.exists()){
            rname.value=snapshot.val().userDetails.firstname;
            ruid.value=snapshot.val().userDetails.user_id;
            rgmail.value=snapshot.val().userDetails.email;
            
        }
        else{
            alert("can't retrieve");
        }
    })
}

function addudata2() {  
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


function adddash_data() {  
    // Get values from input fields
    let destinationName = document.getElementById("destination-name").value;
    let packageName = document.getElementById("package-name").value;
    let budget = document.getElementById("budget").value;
    let description = document.getElementById("description").value;
    let vendor_name = document.getElementById("vendor-name").value;
    let vendor_id = document.getElementById("vendor-id").value;

    // Reference to the destination node, specifically to the "vendors" section
    let destinationRef = ref(db, 'Destinations/' + destinationName + '/vendors');

    // Use `push()` to create a new unique entry for each vendor
    let newVendorRef = push(destinationRef);

    // Set the new vendor's data under the newly created unique entry
    set(newVendorRef, {
        vendor_name: vendor_name,
        vendor_id: vendor_id,
        package_details: packageName,
        budget: budget,
        description: description
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
if(user_data){
    user_data.addEventListener('click',retreve_data);
}
if(dashbtn){
    dashbtn.addEventListener('click',adddash_data);
}


// Existing Firebase setup code


// ---- New functionality to fetch vendors for a specific destination ----
// Function to fetch and display vendors for the selected destination
function fetchVendorsForDestination() {
    const params = new URLSearchParams(window.location.search);
    const destination = params.get('destinationName'); // Get 'destinationName' from URL
    const vendorsList = document.getElementById('vendors-list'); // Get the container for displaying vendors

    if (!destination) {
        vendorsList.innerHTML = '<p>No destination selected.</p>';
        return;
    }

    // Update the header with the destination name
    document.getElementById('destination-name').textContent = destination;

    const destinationRef = ref(db, 'Destinations/' + destination + '/vendors');

    // Fetch data from Firebase
    get(destinationRef).then(snapshot => {
        if (snapshot.exists()) {
            const vendors = snapshot.val();
            vendorsList.innerHTML = ''; // Clear previous content if any

            // Loop through each vendor and create elements to display
            for (let key in vendors) {
                const vendor = vendors[key];

                // Create a div for each vendor
                const vendorCard = document.createElement('div');
                vendorCard.classList.add('vendor-card'); // Add CSS class for styling

                // Populate the card with vendor details
                vendorCard.innerHTML = `
                    <h2>${vendor.vendor_name}</h2>
                    <p><strong>Package:</strong> ${vendor.package_details}</p>
                    <p><strong>Budget:</strong> ₹${vendor.budget}</p>
                    <p><strong>Description:</strong> ${vendor.description}</p>
                `;

                // Create the "Buy Package" button
                const buyButton = document.createElement('button');
                buyButton.classList.add('buy-package-btn');
                buyButton.textContent = 'Buy Package';

                // Add an event listener for "Buy Package" button click
                buyButton.addEventListener('click', function() {
                    alert(`You are buying the package from ${vendor.vendor_name}!`);
                });

                // Append the button to the vendor card
                vendorCard.appendChild(buyButton);

                // Append the vendor card to the vendorsList container
                vendorsList.appendChild(vendorCard);
            }
        } else {
            vendorsList.innerHTML = '<p>No vendors found for this destination.</p>';
        }
    }).catch(error => {
        console.error('Error fetching vendors:', error);
        vendorsList.innerHTML = '<p>Error fetching vendors data.</p>';
    });
}


// Call the function to fetch and display vendors
// fetchVendorsForDestination();


// Call the function to fetch and log vendors data
// fetchVendorsForDestination();


// Automatically fetch vendors when on the results page
if (window.location.pathname.includes('results.html')) {
    fetchVendorsForDestination();
}
