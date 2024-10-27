// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0XlXERSPwYVn7RGViRD7oBr9dLmumygQ",
  authDomain: "pwda-tugas2-ncus.firebaseapp.com",
  projectId: "pwda-tugas2-ncus",
  storageBucket: "pwda-tugas2-ncus.appspot.com",
  messagingSenderId: "1087676120346",
  appId: "1:1087676120346:web:f8f4cf58b32bcc7de880a3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//login button
const login = document.getElementById("login");
login.addEventListener("click", (event) => {
  event.preventDefault();
  //input email n pass
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      // const user = userCredential.user;
      // alert("Membuat akun...");
      // window.location.href = "index.html";
      // ...
      alert("Berhasil Login!");
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });

  // try {
  //   const userCredential = await firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password);
  //   const user = userCredential.user;
  //   alert(`Welcome ${user.email}`);
  //   // Simpan user ID atau token jika perlu untuk backend
  // } catch (error) {
  //   alert("Error: " + error.message);
  // }
});
