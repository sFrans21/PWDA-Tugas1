// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

import {
  updateDoc,
  increment,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0XlXERSPwYVn7RGViRD7oBr9dLmumygQ",
  authDomain: "pwda-tugas2-ncus.firebaseapp.com",
  projectId: "pwda-tugas2-ncus",
  storageBucket: "pwda-tugas2-ncus.appspot.com",
  messagingSenderId: "1087676120346",
  appId: "1:1087676120346:web:f8f4cf58b32bcc7de880a3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
// const firestore = firebase.firestore(); //gatau mana yang dipake ini apa diatas

// let userId = "userId123";
// let moduleId = "moduleId456";
onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  if (loggedInUserId) {
    const docRef = doc(db, "user", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById("loggedUserName").innerText = userData.name;
          document.getElementById("loggedUserEmail").innerText = userData.email;
          document.getElementById("loggedNim").innerText = userData.nim;
          document.getElementById("loggedFaculty").innerText = userData.faculty;
        } else {
          console.log("NO DOCUMENT FOUND MATCHING ID");
        }
      })
      .catch((error) => {
        console.log("Error getting document");
      });
  } else {
    console.log("User ID not found in local storage");
  }
});

//LOGOUT
const logoutButton = document.getElementById("signout");

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("loggedInUserId");
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});

const toggleLike = async (userId, moduleId, isLiked) => {
  try {
    const moduleRef = doc(db, "user", userId, "modules", moduleId);
    await updateDoc(moduleRef, {
      likes: increment(isLiked ? -1 : 1), // Increment jika unlike
    });
    console.log(isLiked ? "Unliked" : "Liked");
  } catch (error) {
    console.error("Error updating likes:", error);
  }
};

const likeButton = document.getElementById("likeButton");
likeButton.addEventListener("click", async () => {
  const userId = localStorage.getItem("loggedInUserId");
  const moduleId = "module123"; // Ganti dengan module ID dinamis
  const isLiked = false; // Ambil status dari UI

  await toggleLike(userId, moduleId, isLiked);
});
