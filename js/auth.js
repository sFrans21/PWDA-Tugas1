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

// const toggleLike = async (userId, moduleId, isLiked) => {
//   try {
//     const moduleRef = doc(db, "user", userId, "modules", moduleId);
//     await updateDoc(moduleRef, {
//       likes: increment(isLiked ? -1 : 1), // Increment jika unlike
//     });
//     console.log(isLiked ? "Unliked" : "Liked");
//   } catch (error) {
//     console.error("Error updating likes:", error);
//   }
// };

const toggleLike = async (moduleId) => {
  try {
    const moduleRef = doc(db, "modules", moduleId);

    if (isLiked) {
      await updateDoc(moduleRef, { likes: increment(-1) });
    } else {
      await updateDoc(moduleRef, { likes: increment(1) });
    }

    isLiked = !isLiked; // Toggle status
    const moduleDoc = await getDoc(moduleRef);
    if (moduleDoc.exists()) {
      const moduleData = moduleDoc.data();
      likeCountElement.innerText = moduleData.likes;
      updateLikeButtonUI();
    }
  } catch (error) {
    console.error("Error updating likes:", error);
  }
};

const likeButton = document.getElementById("likeButton");
const likeCountElement = document.getElementById("likeCount");
let isLiked = false;

const updateLikeButtonUI = () => {
  if (isLiked) {
    likeButton.classList.add("liked");
    likeButton.innerHTML =
      '<i class="fas fa-heart"></i><span id="likeTest">unlike</span>';
  } else {
    likeButton.classList.remove("liked");
    likeButton.innerHTML =
      '<i class="far fa-heart"></i><span id="likeTest">like</span>';
  }
};

likeButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const userId = localStorage.getItem("loggedInUserId");
  const moduleId = "module123"; // Ganti dengan ID modul yang sesuai

  if (!userId) {
    alert("Anda harus login terlebih dahulu!");
    return;
  }

  try {
    await toggleLike(userId, moduleId, isLiked); // Fungsi toggleLike dari langkah sebelumnya
    isLiked = !isLiked; // Ubah status
    const currentCount = parseInt(likeCountElement.innerText, 10);
    likeCountElement.innerText = isLiked ? currentCount + 1 : currentCount - 1;
    updateLikeButtonUI();
  } catch (error) {
    console.error("Error handling like button:", error);
  }
});

const loadLikeStatus = async () => {
  const userId = localStorage.getItem("loggedInUserId");
  const moduleId = "module123"; // Ganti dengan ID modul yang sesuai

  if (!userId) return;

  try {
    const moduleRef = doc(db, "users", userId, "modules", moduleId);
    const moduleDoc = await getDoc(moduleRef);
    if (moduleDoc.exists()) {
      const moduleData = moduleDoc.data();
      isLiked = moduleData.isLiked || false;
      const likeCount = moduleData.likes || 0;
      likeCountElement.innerText = likeCount;
      updateLikeButtonUI();
    }
  } catch (error) {
    console.error("Error loading like status:", error);
  }
};

likeButton.addEventListener("click", (event) => {
  event.preventDefault();
  const moduleId = "modul1"; // Ganti dengan ID modul yang sesuai
  toggleLike(moduleId);
});

const loadModuleData = async (moduleId) => {
  try {
    const moduleRef = doc(db, "modules", moduleId);
    const moduleDoc = await getDoc(moduleRef);

    if (moduleDoc.exists()) {
      const moduleData = moduleDoc.data();
      likeCountElement.innerText = moduleData.likes || 0;
      isLiked = false; // Default
      updateLikeButtonUI();
    } else {
      console.log("Module data not found");
    }
  } catch (error) {
    console.error("Error loading module data:", error);
  }
};

window.addEventListener("load", () => {
  const moduleId = "modul1"; // Ganti dengan ID modul yang sesuai
  loadModuleData(moduleId);
});

window.addEventListener("load", loadLikeStatus);

const initializeModule = async (moduleId, title) => {
  const moduleRef = doc(db, "modules", moduleId);
  await setDoc(moduleRef, { title, likes: 0 });
};

initializeModule("modul1", "Modul 1 - Filsafat Pancasila");
