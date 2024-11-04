// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// import {
//   getAuth,
//   onAuthStateChanged,
//   signOut,
// } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// import {
//   getFirestore,
//   getDoc,
//   doc,
// } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD0XlXERSPwYVn7RGViRD7oBr9dLmumygQ",
//   authDomain: "pwda-tugas2-ncus.firebaseapp.com",
//   projectId: "pwda-tugas2-ncus",
//   storageBucket: "pwda-tugas2-ncus.appspot.com",
//   messagingSenderId: "1087676120346",
//   appId: "1:1087676120346:web:f8f4cf58b32bcc7de880a3",
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const db = getFirestore();

// onAuthStateChanged(auth, (user) => {
//   const loggedInUserId = localStorage.getItem("loggedInUserId");
//   if (loggedInUserId) {
//     const docRef = doc(db, "users", loggedInUserId);
//     getDoc(docRef)
//       .then((docSnap) => {
//         if (docSnap.exists()) {
//           const userData = docSnap.data();
//           document.getElementById("loggedUserName").innerText =
//             userData.fullName;
//           document.getElementById("loggedUserEmail").innerText = userData.email;
//         } else {
//           console.log("NO DOCUMENT FOUND MATCHING ID");
//         }
//       })
//       .catch((error) => {
//         console.log("Error getting document");
//       });
//   } else {
//     console.log("User ID not found in local storage");
//   }
// });

let toggleBtn = document.getElementById("toggle-btn");
let body = document.body;
let darkMode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
  toggleBtn.classList.replace("fa-sun", "fa-moon");
  body.classList.add("dark");
  localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
  toggleBtn.classList.replace("fa-moon", "fa-sun");
  body.classList.remove("dark");
  localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode();
}

toggleBtn.onclick = (e) => {
  darkMode = localStorage.getItem("dark-mode");
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
};

let profile = document.querySelector(".header .flex .profile");

document.querySelector("#user-btn").onclick = () => {
  profile.classList.toggle("active");
  search.classList.remove("active");
};

let search = document.querySelector(".header .flex .search-form");

document.querySelector("#search-btn").onclick = () => {
  search.classList.toggle("active");
  profile.classList.remove("active");
};

let sideBar = document.querySelector(".side-bar");

document.querySelector("#menu-btn").onclick = () => {
  sideBar.classList.toggle("active");
  body.classList.toggle("active");
};

document.querySelector("#close-btn").onclick = () => {
  sideBar.classList.remove("active");
  body.classList.remove("active");
};

window.onscroll = () => {
  profile.classList.remove("active");
  search.classList.remove("active");

  if (window.innerWidth < 1200) {
    sideBar.classList.remove("active");
    body.classList.remove("active");
  }
};
