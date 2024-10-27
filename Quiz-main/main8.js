let quizData = [
  {
    question:
      "Menurut konsep John Locke, bagaimana hubungan antara rakyat dan penguasa?",
    options: [
      "Rakyat menyerahkan semua hak kepada penguasa",
      "Rakyat mempertahankan hak kodrati mereka yang dilindungi konstitusi",
      "Penguasa memiliki hak untuk menafsirkan hukum secara sepihak",
      "Rakyat dan penguasa berhak menegosiasikan kembali perjanjian setiap tahun",
    ],
    correct:
      "Rakyat mempertahankan hak kodrati mereka yang dilindungi konstitusi",
  },
  {
    question:
      "Apa yang menjadi kewajiban utama pemerintah dalam kontrak sosial menurut pandangan Jean Jacques Rousseau?",
    options: [
      "Menjalankan perintah rakyat melalui konstitusi negara",
      "Mengutamakan keamanan nasional di atas kesejahteraan rakyat",
      "Menjamin hak istimewa bagi kelompok mayoritas",
      "Membuat peraturan tanpa perlu persetujuan rakyat",
    ],
    correct: "Menjalankan perintah rakyat melalui konstitusi negara",
  },
  {
    question:
      "Menurut UUD NRI 1945, siapa yang diakui sebagai warga negara Indonesia?",
    options: [
      "Orang yang lahir di Indonesia tanpa pengecualian",
      "Orang yang menjadi anggota komunitas internasional",
      "Bangsa Indonesia asli dan orang yang disahkan UU",
      "Individu yang tinggal di Indonesia lebih dari 5 tahun",
    ],
    correct: "Bangsa Indonesia asli dan orang yang disahkan UU",
  },
  {
    question:
      "Apa yang menjadi dasar utama dari hak asasi manusia dalam pandangan Indonesia?",
    options: [
      "Hak asasi manusia adalah kebebasan tanpa batas",
      "Hak asasi manusia sebagai anugerah dari Tuhan Yang Maha Esa",
      "Hak asasi manusia terbatas pada hak sipil dan politik",
      "Hak asasi manusia berfokus pada keuntungan ekonomi",
    ],
    correct: "Hak asasi manusia sebagai anugerah dari Tuhan Yang Maha Esa",
  },
  {
    question:
      "Dalam konteks UUD NRI 1945, apa peran negara terkait hak asasi manusia?",
    options: [
      "Membatasi hak-hak sipil untuk keamanan negara",
      "Memberikan hak penuh bagi individu tanpa batasan",
      "Melindungi dan menghormati hak asasi manusia",
      "Memastikan kebebasan ekonomi di atas hak lainnya",
    ],
    correct: "Melindungi dan menghormati hak asasi manusia",
  },
  {
    question:
      "Bagaimana pandangan nasional Indonesia terhadap hak asasi manusia dalam menghadapi globalisasi?",
    options: [
      "Indonesia mendukung hak asasi secara universal tanpa kecuali",
      "Indonesia menerapkan hak asasi yang berlandaskan Pancasila dan UUD",
      "Hak asasi manusia dianggap hanya sebagai konsep barat",
      "Hak asasi manusia selalu diprioritaskan dalam setiap kebijakan",
    ],
    correct:
      "Indonesia menerapkan hak asasi yang berlandaskan Pancasila dan UUD",
  },
  {
    question:
      "Apa yang dimaksud dengan 'ius soli' dalam konteks kewarganegaraan Indonesia?",
    options: [
      "Asas yang berdasarkan pada garis keturunan",
      "Asas kewarganegaraan berdasarkan tempat kelahiran",
      "Asas kewarganegaraan yang diakui secara internasional",
      "Asas untuk memberikan kewarganegaraan hanya pada pria",
    ],
    correct: "Asas kewarganegaraan berdasarkan tempat kelahiran",
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

  let secondsLeft = 9;
  const timerDisplay = document.querySelector(".quiz-container .timer");
  timerDisplay.classList.remove("danger");

  timerDisplay.textContent = `Time Left: 10 seconds`;

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
  quizData = shuffleArray(quizData);
  resetLocalStorage();

  createQuestion();
  quizResult.style.display = "none";
  quizContainer.style.display = "block";
};

const displayQuizResult = () => {
  quizResult.style.display = "flex";
  quizContainer.style.display = "none";
  quizResult.innerHTML = "";

  const resultHeading = document.createElement("h2");
  resultHeading.innerHTML = `Kamu mencetak ${score} dari ${MAX_QUESTIONS} pertanyaan!`;

  quizResult.appendChild(resultHeading);

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
                            <div class="user-answer">Your answer: ${
                              userAnswer || "Not Answered"
                            }</div>
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
