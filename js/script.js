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

// document.querySelector("#like").onclick = () => {
//   firestore
//     .collection("users")
//     .doc(userId)
//     .collection("modules")
//     .doc(moduleId)
//     .set(
//       {
//         quizProgress: {
//           score: score, // Nilai yang diperoleh pengguna
//           status: status, // Status "finished" atau "not finished"
//         },
//       },
//       { merge: true }
//     ) // Merge memastikan data lain dalam modul tidak terhapus
//     .then(() => {
//       console.log("Progress quiz berhasil disimpan!");
//     })
//     .catch((error) => {
//       console.error("Error menyimpan progress quiz: ", error);
//     });
// };

const incrementLikes = (userId, moduleId) => {
  firestore
    .collection("users")
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

document.querySelector("#like").onclick = decrementLikes(userId, moduleId);
