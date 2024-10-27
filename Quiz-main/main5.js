let quizData = [
  {
    question:
      "Apa yang menjadi prinsip dasar negara hukum menurut UUD 1945 dalam melindungi hak warga negara?",
    options: [
      "Pembatasan kebebasan berbicara",
      "Keberadaan organ eksekutif yang independen",
      "Pemusatan kekuasaan pada presiden",
      "Mengutamakan keamanan ketimbang keadilan",
    ],
    correct: "Keberadaan organ eksekutif yang independen",
  },
  {
    question:
      "Dalam konsep negara hukum modern, apa peran utama negara terhadap warganya?",
    options: [
      "Hanya menjaga ketertiban umum tanpa ikut campur dalam kesejahteraan",
      "Memberikan perlindungan hak asasi melalui pemenuhan kesejahteraan umum",
      "Menegakkan keamanan melalui otoritas absolut",
      "Menjaga stabilitas ekonomi nasional melalui intervensi penuh",
    ],
    correct:
      "Memberikan perlindungan hak asasi melalui pemenuhan kesejahteraan umum",
  },
  {
    question:
      "Apa yang dimaksud dengan 'Supermasi Hukum' dalam konteks negara hukum?",
    options: [
      "Pengutamaan kekuasaan eksekutif di atas hukum",
      "Pengutamaan kepentingan individu atas hukum",
      "Hukum memiliki kedudukan tertinggi yang mengikat semua pihak",
      "Pembentukan hukum berdasarkan konsensus mayoritas",
    ],
    correct: "Hukum memiliki kedudukan tertinggi yang mengikat semua pihak",
  },
  {
    question:
      "Menurut teori Stuffenbau, apakah norma dasar dari sistem hukum di Indonesia?",
    options: [
      "Undang-undang",
      "Peraturan pemerintah",
      "Pancasila",
      "Peraturan daerah",
    ],
    correct: "Pancasila",
  },
  {
    question: "Apakah yang menjadi ciri khas dari negara hukum klasik?",
    options: [
      "Memberikan jaminan terhadap kesejahteraan rakyat",
      "Melibatkan diri dalam berbagai bidang kehidupan sosial",
      "Hanya menjaga ketertiban dan melindungi hak asasi secara pasif",
      "Mengutamakan prinsip kesetaraan dalam hukum",
    ],
    correct: "Hanya menjaga ketertiban dan melindungi hak asasi secara pasif",
  },
  {
    question:
      "Apa yang menjadi pembatas kekuasaan penguasa dalam negara hukum menurut pandangan Rechstaat?",
    options: [
      "Perintah langsung dari presiden",
      "Adanya peraturan undang-undang yang mengikat",
      "Kebebasan tanpa batas untuk penguasa",
      "Kekuasaan militer yang terpisah",
    ],
    correct: "Adanya peraturan undang-undang yang mengikat",
  },
  {
    question:
      "Dalam sistem hukum Indonesia, apa fungsi dari 'prinsip demokrasi' yang diterapkan?",
    options: [
      "Menjamin bahwa presiden memiliki hak veto absolut",
      "Memberikan wewenang penuh kepada mayoritas",
      "Memastikan bahwa kedaulatan berada di tangan rakyat",
      "Mengutamakan hukum adat sebagai pedoman utama",
    ],
    correct: "Memastikan bahwa kedaulatan berada di tangan rakyat",
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
