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
  setDoc,
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

const auth = getAuth();
const db = getFirestore();

const likeButton = document.getElementById("likeButton");
const likeCountElement = document.getElementById("likeCount");
let isLiked = false;

const incrementLikes = (userId, moduleId) => {
  firestore
    .collection("user")
    .doc(userId)
    .collection("modules")
    .doc(moduleId)
    .update({
      likes: firebase.firestore.FieldValue.increment(1), // Menambah 1 like
    })
    .then(() => {
      console.log("Like berhasil ditambahkan!");
    })
    .catch((error) => {
      console.error("Error menambah like: ", error);
    });
};

const decrementLikes = (userId, moduleId) => {
  firestore
    .collection("users")
    .doc(userId)
    .collection("modules")
    .doc(moduleId)
    .update({
      likes: firebase.firestore.FieldValue.increment(-1), // Mengurangi 1 like
    })
    .then(() => {
      console.log("Like berhasil dikurangi!");
    })
    .catch((error) => {
      console.error("Error mengurangi like: ", error);
    });
};
