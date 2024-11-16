// // Import necessary Firestore SDK components
// import { getFirestore, doc, updateDoc } from "firebase/firestore";
// import { getAuth, updateEmail, updatePassword } from "firebase/auth";

// // Initialize Firestore and Auth
// const db = getFirestore();
// const auth = getAuth();

// const update = document.getElementById("update");
// update.addEventListener("click", function (event) {
//   event.preventDefault();

//   const email = document.getElementById("email").value;
//   const prevpass = document.getElementById("prevpass").value;
//   const newpass = document.getElementById("newpass").value;
//   const name = document.getElementById("name").value;
//   const nim = document.getElementById("upNIM").value;
//   const faculty = document.getElementById("upFac").value;

//   updateProfile(
//     userId,
//     name,
//     email,
//     prevPassword,
//     newPassword,
//     nim,
//     faculty
//   ).then((userCredential) => {
//     const user = userCredential.user;
//     try {
//       // Reference to the user document in Firestore
//       const userDocRef = doc(db, "user", user.uid);

//       // Update Firestore user profile data
//       updateDoc(userDocRef, {
//         name: name,
//         email: email,
//         // password: newpass,
//         nim: nim,
//         faculty: faculty,
//       });

//       // If profile picture is provided, update profile picture URL in Firestore (assuming URL is being saved)
//       // if (profilePic) {
//       //   const profilePicUrl = uploadProfilePic(userId, profilePic);
//       //   updateDoc(userDocRef, {
//       //     profilePicUrl: profilePicUrl,
//       //   });
//       // }

//       // Update email if it has changed
//       if (auth.currentUser && auth.currentUser.email !== email) {
//         updateEmail(auth.currentUser, email);
//       }

//       // Update password if provided
//       if (newPassword != prevPassword) {
//         updatePassword(auth.currentUser, newPassword);
//       }

//       console.log("Profile updated successfully");
//     } catch (error) {
//       console.error("Error updating profile: ", error);
//     }
//   });
// });
// // Function to upload the profile picture to storage
// // async function uploadProfilePic(userId, file) {
// //   // Implement the profile picture upload here (e.g., using Firebase Storage)
// //   // For the purpose of this example, we assume the function returns the download URL of the uploaded image
// //   const downloadUrl = "https://example.com/path/to/uploaded/image.jpg";
// //   return downloadUrl;
// // }

// // Usage
// // const email = document.getElementById("email").value;
// // const prevpass = document.getElementById("prevpass").value;
// // const newpass = document.getElementById("newpass").value;
// // const name = document.getElementById("name").value;
// // const nim = document.getElementById("upNIM").value;
// // const faculty = document.getElementById("upFac").value;

// // Call the function to update the profile

// // const update = document.getElementById("update");

// // update.addEventListener("click", async (e) => {
// //   e.preventDefault();
// //   updateProfile(userId, name, email, prevpass, newpass, nim, faculty);
// // });

// BATAS COMMENt

// Import necessary Firestore SDK components
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  updateEmail,
  updatePassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  getFirestore,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration
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
const auth = getAuth();
const db = getFirestore();

// Update profile function
async function updateProfile(
  userId,
  name,
  email,
  prevPassword,
  newPassword,
  nim,
  faculty,
  profilePic
) {
  try {
    // Re-authenticate user before updating profile
    const user = auth.currentUser;
    await signInWithEmailAndPassword(auth, user.email, prevPassword);

    // Reference to the user document in Firestore
    const userDocRef = doc(db, "user", userId);

    // Update Firestore user profile data
    await updateDoc(userDocRef, {
      name: name,
      email: email,
      nim: nim,
      faculty: faculty,
    });

    // Update email if it has changed
    if (user && user.email !== email) {
      await updateEmail(user, email);
    }

    // Update password if provided
    if (newPassword && newPassword !== prevPassword) {
      await updatePassword(user, newPassword);
    }

    // If profile picture is provided, upload it (assuming storage integration)
    // if (profilePic) {
    //   const profilePicUrl = await uploadProfilePic(userId, profilePic);
    //   await updateDoc(userDocRef, {
    //     profilePicUrl: profilePicUrl,
    //   });
    // }

    console.log("Profile updated successfully");
    alert("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile: ", error);
    alert("Error updating profile: " + error.message);
  }
}

// Function to upload the profile picture to storage
async function uploadProfilePic(userId, file) {
  // Implement the profile picture upload here (e.g., using Firebase Storage)
  // For this example, we assume the function returns the download URL of the uploaded image
  const downloadUrl = "https://example.com/path/to/uploaded/image.jpg";
  return downloadUrl;
}

// Event listener for form submission
document.getElementById("update").addEventListener("click", async (e) => {
  e.preventDefault();

  const userId = auth.currentUser.uid;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const prevPassword = document.getElementById("prevpass").value;
  const newPassword = document.getElementById("newpass").value;
  const nim = document.getElementById("upNIM").value;
  const faculty = document.getElementById("upFac").value;
  const profilePic = document.querySelector("input[type='file']").files[0];

  await updateProfile(
    userId,
    name,
    email,
    prevPassword,
    newPassword,
    nim,
    faculty,
    profilePic
  );
});
