let quizData = [
  {
    question:
      "Apa yang dimaksud dengan kewarganegaraan dalam arti yuridis menurut materi?",
    options: [
      "Kewarganegaraan yang diakui berdasarkan hukum formal",
      "Kewarganegaraan yang bersifat sosial dan budaya",
      "Keanggotaan yang hanya ditentukan oleh tempat kelahiran",
      "Hubungan sosial antara negara dengan penduduknya",
    ],
    correct: "Kewarganegaraan yang diakui berdasarkan hukum formal",
  },
  {
    question:
      "Bagaimana konsep asas ‘ius soli’ mempengaruhi penentuan kewarganegaraan seseorang?",
    options: [
      "Berdasarkan garis keturunan atau darah",
      "Berdasarkan tempat kelahiran",
      "Berdasarkan status pernikahan orang tua",
      "Berdasarkan hukum negara lain",
    ],
    correct: "Berdasarkan tempat kelahiran",
  },
  {
    question:
      "Pasal 27 ayat 1 UUD 1945 menetapkan kewajiban warga negara. Apa kewajiban tersebut?",
    options: [
      "Menaati hukum dan peraturan pemerintah",
      "Berpartisipasi dalam pemilu",
      "Menjaga lingkungan hidup",
      "Memiliki kedudukan setara dalam ekonomi",
    ],
    correct: "Menaati hukum dan peraturan pemerintah",
  },
  {
    question:
      "Apa perbedaan antara hak asasi manusia dan hak warga negara dalam konteks UUD 1945?",
    options: [
      "Hak asasi bersifat universal, sedangkan hak warga negara khusus",
      "Hak asasi berfokus pada pendidikan, hak warga negara pada ekonomi",
      "Hak warga negara berfokus pada kewajiban, hak asasi pada kedudukan",
      "Hak warga negara lebih luas dibandingkan hak asasi manusia",
    ],
    correct: "Hak asasi bersifat universal, sedangkan hak warga negara khusus",
  },
  {
    question:
      "Mengapa prinsip kewarganegaraan tunggal diterapkan dalam UU Kewarganegaraan Indonesia?",
    options: [
      "Untuk meminimalkan konflik identitas di negara",
      "Agar lebih banyak hak diberikan pada warga negara",
      "Untuk menjaga kesetiaan penuh terhadap Indonesia",
      "Agar proses administrasi lebih efisien",
    ],
    correct: "Untuk menjaga kesetiaan penuh terhadap Indonesia",
  },
  {
    question: "Apa yang dimaksud dengan peran positif seorang warga negara?",
    options: [
      "Mematuhi hukum tanpa pengecualian",
      "Berpartisipasi aktif dalam pembangunan negara",
      "Meminta layanan negara untuk kebutuhan hidup",
      "Menolak campur tangan negara dalam hal pribadi",
    ],
    correct: "Meminta layanan negara untuk kebutuhan hidup",
  },
  {
    question:
      "Hak warga negara untuk mendapatkan pendidikan diatur dalam pasal berapa?",
    options: [
      "Pasal 27 UUD 1945",
      "Pasal 28 UUD 1945",
      "Pasal 30 UUD 1945",
      "Pasal 31 UUD 1945",
    ],
    correct: "Pasal 31 UUD 1945",
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
