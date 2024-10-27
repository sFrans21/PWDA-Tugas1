let quizData = [
  {
    question:
      "Apa yang menjadi faktor utama dalam menentukan kepentingan nasional suatu negara?",
    options: [
      "Kepentingan ekonomi internasional",
      "Keamanan dan kedaulatan negara",
      "Kepentingan individu dalam pemerintahan",
      "Keunggulan budaya nasional atas negara lain",
    ],
    correct: "Keamanan dan kedaulatan negara",
  },
  {
    question:
      "Bagaimana konsep kepentingan nasional didefinisikan dalam konteks politik luar negeri?",
    options: [
      "Sebagai kebijakan yang hanya menguntungkan negara sendiri",
      "Sebagai prioritas untuk mendominasi negara lain",
      "Sebagai strategi yang menjaga kedaulatan dengan kerjasama internasional",
      "Sebagai bentuk aliansi ekonomi tanpa pertimbangan politik",
    ],
    correct:
      "Sebagai strategi yang menjaga kedaulatan dengan kerjasama internasional",
  },
  {
    question: "Apa yang menjadi tujuan utama kepentingan nasional Indonesia?",
    options: [
      "Mengamankan seluruh sumber daya dari negara asing",
      "Menjadi negara adidaya dalam kawasan Asia Tenggara",
      "Melindungi kemandirian dan mendorong kesejahteraan rakyat",
      "Menjadi pusat ekonomi terbesar di dunia",
    ],
    correct: "Melindungi kemandirian dan mendorong kesejahteraan rakyat",
  },
  {
    question:
      "Mengapa kerjasama internasional penting dalam mencapai kepentingan nasional Indonesia?",
    options: [
      "Untuk menghindari semua bentuk aliansi militer",
      "Untuk mendukung keamanan global dan stabilitas regional",
      "Agar dapat mengontrol perdagangan internasional",
      "Untuk memastikan dominasi dalam pasar regional",
    ],
    correct: "Untuk mendukung keamanan global dan stabilitas regional",
  },
  {
    question:
      "Bagaimana kepentingan nasional diimplementasikan dalam kebijakan domestik Indonesia?",
    options: [
      "Dengan mengurangi ketergantungan terhadap impor",
      "Dengan meningkatkan kerjasama dengan negara maju",
      "Dengan menerapkan prinsip kemandirian dan keadilan sosial",
      "Dengan mengadopsi kebijakan proteksionisme yang ketat",
    ],
    correct: "Dengan menerapkan prinsip kemandirian dan keadilan sosial",
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
