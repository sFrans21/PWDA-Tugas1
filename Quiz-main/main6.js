let quizData = [
  {
    question:
      "Bagaimana demokrasi Indonesia menurut konsep Demokrasi Pancasila?",
    options: [
      "Mengutamakan kebebasan individu",
      "Berlandaskan hati nurani dan kesetaraan",
      "Bersifat formal dan administratif",
      "Mengikuti model demokrasi liberal",
    ],
    correct: "Berlandaskan hati nurani dan kesetaraan",
  },
  {
    question:
      "Apa yang dimaksud dengan ‘demokrasi prosedural’ dalam konteks Indonesia?",
    options: [
      "Demokrasi yang hanya menjalankan aturan tanpa esensi",
      "Sistem pemerintahan yang melibatkan rakyat secara aktif",
      "Demokrasi yang menekankan hak asasi manusia",
      "Pemerintahan berdasarkan ideologi tertentu",
    ],
    correct: "Demokrasi yang hanya menjalankan aturan tanpa esensi",
  },
  {
    question:
      "Sanusi (1998) menyebutkan bahwa salah satu pilar demokrasi konstitusional Indonesia adalah:",
    options: [
      "Demokrasi yang berdasarkan kebebasan penuh",
      "Demokrasi dengan kecerdasan",
      "Demokrasi yang sepenuhnya dikuasai negara",
      "Demokrasi tanpa otonomi daerah",
    ],
    correct: "Demokrasi dengan kecerdasan",
  },
  {
    question:
      "Menurut Bung Karno, demokrasi yang cocok bagi Indonesia bukanlah demokrasi Barat tetapi demokrasi berbentuk:",
    options: [
      "Liberalisme individu",
      "Permusyawaratan yang memberi hidup",
      "Kedaulatan rakyat absolut",
      "Kesepakatan berbasis ekonomi",
    ],
    correct: "Permusyawaratan yang memberi hidup",
  },
  {
    question:
      "Apa yang menjadi tujuan utama penerapan pendidikan demokrasi di Indonesia?",
    options: [
      "Mendorong rakyat berperan dalam pemilu",
      "Meningkatkan ketertiban umum",
      "Membangun warga negara yang tahu, mau, dan mampu demokrasi",
      "Menghapus perbedaan pandangan politik di masyarakat",
    ],
    correct: "Membangun warga negara yang tahu, mau, dan mampu demokrasi",
  },
  {
    question:
      "Bagaimana perbedaan utama antara demokrasi langsung dan demokrasi Pancasila?",
    options: [
      "Demokrasi langsung didasarkan pada keadilan, Pancasila pada mayoritas",
      "Demokrasi langsung mengutamakan suara mayoritas, Pancasila menggunakan musyawarah",
      "Demokrasi Pancasila tidak melibatkan rakyat dalam keputusan",
      "Demokrasi langsung hanya berlaku di Indonesia",
    ],
    correct:
      "Demokrasi langsung mengutamakan suara mayoritas, Pancasila menggunakan musyawarah",
  },
  {
    question:
      "Apa yang menjadi kendala besar dalam penerapan demokrasi berkeadaban di Indonesia menurut materi?",
    options: [
      "Kurangnya partisipasi warga negara dalam politik",
      "Liberalisme dan sekularisme yang mengancam nilai Pancasila",
      "Tingginya biaya kampanye politik",
      "Pengaruh budaya global dalam sistem pendidikan",
    ],
    correct: "Liberalisme dan sekularisme yang mengancam nilai Pancasila",
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
