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

const updateLikeDisplay = (count) => {
  document.getElementById("likeCount").innerText = count;
  document.getElementById("likeText").innerText = isLiked ? "unlike" : "like";
};

// Fungsi untuk mengambil jumlah like dari Firestore dan menampilkan
const getLikeCount = async () => {
  try {
    const moduleRef = firestore
      .collection("users")
      .doc(userId)
      .collection("modules")
      .doc(moduleId);
    const moduleDoc = await moduleRef.get();
    if (moduleDoc.exists) {
      likeCount = moduleDoc.data().likes || 0;
      isLiked = moduleDoc.data().isLiked || false; // Optional jika ingin simpan status like di Firestore
      updateLikeDisplay(likeCount);
    }
  } catch (error) {
    console.error("Error mengambil jumlah like:", error);
  }
};

// // Fungsi untuk menambah jumlah like di Firestore
// const incrementLikes = async () => {
//   await firestore
//     .collection("users")
//     .doc(userId)
//     .collection("modules")
//     .doc(moduleId)
//     .update({
//       likes: firebase.firestore.FieldValue.increment(1),
//     });
//   likeCount += 1;
//   isLiked = true;
//   updateLikeDisplay(likeCount);
// };

// // Fungsi untuk mengurangi jumlah like di Firestore
// const decrementLikes = async () => {
//   await firestore
//     .collection("users")
//     .doc(userId)
//     .collection("modules")
//     .doc(moduleId)
//     .update({
//       likes: firebase.firestore.FieldValue.increment(-1),
//     });
//   likeCount -= 1;
//   isLiked = false;
//   updateLikeDisplay(likeCount);
// };

// // Event listener untuk tombol like
// document.getElementById("likeButton").addEventListener("click", () => {
//   if (isLiked) {
//     decrementLikes(); // Jika sudah di-like, maka unlike
//   } else {
//     incrementLikes(); // Jika belum di-like, maka like
//   }
// });
