let quizData = [
  {
    question: "Apa makna dari Pancasila sebagai dasar negara?",
    options: [
      "Ideologi tunggal",
      "Landasan etika dan moral",
      "Sumber kekuasaan",
      "Pedoman hidup masyarakat",
    ],
    correct: "Landasan etika dan moral",
  },
  {
    question:
      "Prinsip ketuhanan yang maha esa dalam Pancasila menekankan pada?",
    options: [
      "Kebebasan beragama",
      "Keberagaman agama",
      "Pengakuan terhadap Tuhan yang satu",
      "Penolakan terhadap agama",
    ],
    correct: "Pengakuan terhadap Tuhan yang satu",
  },
  {
    question:
      "Sila kedua Pancasila, yaitu Kemanusiaan yang Adil dan Beradab, menekankan pentingnya",
    options: [
      "Keadilan sosial",
      "Hak asasi manusia",
      "Persatuan bangsa",
      "Pendidikan untuk semua",
    ],
    correct: "Hak asasi manusia",
  },
  {
    question: "Salah satu tujuan Pancasila adalah untuk",
    options: [
      "Menciptakan konflik antaragama",
      "Memperkuat identitas nasional",
      "Menghapuskan budaya lokal",
      "Mewujudkan masyarakat sekuler",
    ],
    correct: "Memperkuat identitas nasional",
  },
  {
    question:
      "Sila keempat Pancasila, Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan, menekankan pentingnya",
    options: [
      "Demokrasi langsung",
      "Keterlibatan masyarakat",
      "Pemerintahan otoriter",
      "Pemimpin yang kuat",
    ],
    correct: "Keterlibatan masyarakat",
  },
  {
    question:
      "Sila pertama Pancasila, Ketuhanan yang Maha Esa, mencerminkan sikap",
    options: ["Materialistis", "Spiritual", "Agnostik", "Atheis"],
    correct: "Spiritual",
  },
  {
    question:
      "Pancasila sebagai pandangan hidup bangsa Indonesia berfungsi untuk",
    options: [
      "Membatasi kebebasan individu",
      "Mewujudkan kesejahteraan sosial",
      "Menghapuskan perbedaan budaya",
      "Menjaga kestabilan politik",
    ],
    correct: "Mewujudkan kesejahteraan sosial",
  },
  {
    question:
      "Dalam konteks Pancasila, persatuan dan kesatuan bangsa diartikan sebagai",
    options: [
      "Menjaga keragaman",
      "Mengabaikan perbedaan",
      "Mengutamakan konflik",
      "Mempromosikan diskriminasi",
    ],
    correct: "Menjaga keragaman",
  },
  {
    question: "Pancasila sebagai dasar negara mengatur hubungan antara",
    options: [
      "Rakyat dan pemimpin",
      "Individu dan komunitas",
      "Agama dan negara",
      "Semua pilihan di atas",
    ],
    correct: "Semua pilihan di atas",
  },
];

const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn-container .start-btn");

let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 7;
let timerInterval;
let status = 0;

const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

quizData = shuffleArray(quizData);

const resetLocalStorage = () => {
  for (i = 0; i < MAX_QUESTIONS; i++) {
    localStorage.removeItem(`userAnswer_${i}`);
  }
};

resetLocalStorage();

const checkAnswer = (e) => {
  let userAnswer = e.target.textContent;
  if (userAnswer === quizData[questionNumber].correct) {
    score++;
    e.target.classList.add("correct");
  } else {
    e.target.classList.add("incorrect");
  }

  localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

  let allOptions = document.querySelectorAll(".quiz-container .option");
  allOptions.forEach((o) => {
    o.classList.add("disabled");
  });
};

const createQuestion = () => {
  clearInterval(timerInterval);

  let secondsLeft = 14;
  const timerDisplay = document.querySelector(".quiz-container .timer");
  timerDisplay.classList.remove("danger");

  timerDisplay.textContent = `Time Left: 15 seconds`;

  timerInterval = setInterval(() => {
    timerDisplay.textContent = `Time Left: ${secondsLeft
      .toString()
      .padStart(2, "0")} seconds`;
    secondsLeft--;

    if (secondsLeft < 3) {
      timerDisplay.classList.add("danger");
    }

    if (secondsLeft < 0) {
      clearInterval(timerInterval);
      displayNextQuestion();
    }
  }, 1000);

  options.innerHTML = "";
  question.innerHTML = `<span class='question-number'>${
    questionNumber + 1
  }/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;

  const shuffledOptions = shuffleArray(quizData[questionNumber].options);

  shuffledOptions.forEach((o) => {
    const option = document.createElement("button");
    option.classList.add("option");
    option.innerHTML = o;
    option.addEventListener("click", (e) => {
      checkAnswer(e);
    });
    options.appendChild(option);
  });
};

const retakeQuiz = () => {
  questionNumber = 0;
  score = 0;
  status = 0;
  quizData = shuffleArray(quizData);
  resetLocalStorage();

  createQuestion();
  quizResult.style.display = "none";
  quizContainer.style.display = "block";
};

const displayQuizResult = async () => {
  quizResult.style.display = "flex";
  quizContainer.style.display = "none";
  quizResult.innerHTML = "";

  const percentageScore = (score / MAX_QUESTIONS) * 100;
  const userId = localStorage.getItem("loggedInUserId"); // Pastikan ID user tersedia
  const moduleId = "modul1"; // Ganti dengan ID modul yang sesuai
  const resultHeading = document.createElement("h2");
  resultHeading.innerHTML = `You have scored ${score} out of ${MAX_QUESTIONS}.`;
  quizResult.appendChild(resultHeading);

  if (userId) {
    await saveQuizProgress(userId, moduleId, percentageScore, true);
  }

  for (let i = 0; i < MAX_QUESTIONS; i++) {
    const resultItem = document.createElement("div");
    resultItem.classList.add("question-container");

    const userAnswer = localStorage.getItem(`userAnswer_${i}`);
    const correctAnswer = quizData[i].correct;

    let answeredCorrectly = userAnswer === correctAnswer;

    if (!answeredCorrectly) {
      resultItem.classList.add("incorrect");
    }

    resultItem.innerHTML = `<div class="question">Question ${i + 1}: ${
      quizData[i].question
    }</div>
    <div class="user-answer">Your answer: ${userAnswer || "Not Answered"}</div>
    <div class="correct-answer">Correct answer: ${correctAnswer}</div>`;

    quizResult.appendChild(resultItem);
  }

  const retakeBtn = document.createElement("button");
  retakeBtn.classList.add("retake-btn");
  retakeBtn.innerHTML = "Retake Quiz";
  retakeBtn.addEventListener("click", retakeQuiz);
  quizResult.appendChild(retakeBtn);
};

const displayNextQuestion = () => {
  if (questionNumber >= MAX_QUESTIONS - 1) {
    displayQuizResult();
    return;
  }

  questionNumber++;
  createQuestion();
};

nextBtn.addEventListener("click", displayNextQuestion);

startBtn.addEventListener("click", () => {
  startBtnContainer.style.display = "none";
  quizContainer.style.display = "block";
  createQuestion();
});

const saveQuizProgress = (userId, moduleId, score, status) => {
  firestore
    .collection("users")
    .doc(userId)
    .collection("modules")
    .doc(moduleId)
    .set(
      {
        quizProgress: {
          score: score, // Nilai yang diperoleh pengguna
          status: status, // Status "finished" atau "not finished"
        },
      },
      { merge: true }
    ) // Merge memastikan data lain dalam modul tidak terhapus
    .then(() => {
      console.log("Progress quiz berhasil disimpan!");
    })
    .catch((error) => {
      console.error("Error menyimpan progress quiz: ", error);
    });
};

// window.addEventListener("beforeunload", (e) => {
//   if (questionNumber < MAX_QUESTIONS - 1) {
//     e.preventDefault();
//     e.returnValue = "Belum selesai quiz. Yakin ingin pergi?";
//   }
// });
