// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

//REGISTER
const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  event.preventDefault();
  //input email n pass
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const fullName = document.getElementById("name").value;
  const nim = document.getElementById("nim").value;
  const faculty = document.getElementById("faculty").value;

  // const lastName = document.getElementById("lasttName").value;
  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password, nim, faculty)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      const userData = {
        email: email,
        name: fullName,
        nim: nim,
        faculty: faculty,
        password: password,
      };
      alert("Membuat akun...");
      const docRef = doc(db, "user", user.uid);
      setDoc(docRef, userData)
        .then(async () => {
          const moduleId = `module_${user.uid}_${Date.now()}`;
          const moduleData = {
            likes: 0,
            quizProgress: {
              finished: false,
              score: 0,
            },
          };

          const moduleRef = doc(db, "user", user.uid, "modules", moduleId);
          await setDoc(moduleRef, moduleData);

          alert("Berhasil membuat akun");
          window.location.href = "login.html";
        })
        // window.location.href = "login.html";
        // ...
        .catch((error) => {
          console.error("error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});

//LOGIN
const login = document.getElementById("login");
login.addEventListener("click", (event) => {
  event.preventDefault();
  //input email n pass
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // showMessage("berhasil login", "signInmessage");
      alert("Berhasil Login!");
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      // Signed up
      // const user = userCredential.user;
      // alert("Membuat akun...");
      // window.location.href = "index.html";
      // ...
      // alert("Berhasil Login!");
      // const user = userCredential.user;
      // localStorage.setItem("loggedInUserId", user.uid);
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
