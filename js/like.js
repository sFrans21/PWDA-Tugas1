import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  // onAuthStateChanged,
  // signOut,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import {
  getFirestore,
  // getDoc,
  // setDoc,
  updateDoc,
  // doc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// import {
//   updateDoc,
//   increment,
// } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

const handleLike = async (userId, moduleId) => {
  // const userId = "user123"; // Ganti dengan ID pengguna
  // const moduleId = "module_123"; // Ganti dengan ID modul
  const docRef = doc(db, "user", userId, "modules", moduleId);

  try {
    if (isLiked) {
      // Jika sudah di-like, kurangi like
      await updateDoc(docRef, {
        likes: increment(-1),
      });
      isLiked = false;
    } else {
      // Jika belum di-like, tambahkan like
      await updateDoc(docRef, {
        likes: increment(1),
      });
      isLiked = true;
    }

    // Ambil jumlah likes terbaru dari Firestore
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const likeData = docSnapshot.data();
      likeCountElement.textContent = likeData.likes || 0; // Perbarui tampilan likes
    }
  } catch (error) {
    console.error("Error updating likes: ", error);
  }
};

likeButton.addEventListener("click", handleLike);
