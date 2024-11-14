let quizData = [
  {
    question: "Apa tujuan dari filsafat menurut pandangan Descartes?",
    options: [
      "Untuk mengkritik ilmu pengetahuan",
      "Untuk menemukan kebenaran absolut",
      "Untuk memahami keberadaan manusia",
      "Untuk menjadi dasar negara",
    ],
    correct: "Untuk memahami keberadaan manusia",
  },
  {
    question: "Apa arti dari nilai praksis dalam ideologi Pancasila?",
    options: [
      "Nilai-nilai dasar yang tidak berubah",
      "Pelaksanaan nilai-nilai instrumental dalam kehidupan nyata",
      "Nilai-nilai yang hanya berfungsi sementara",
      "Nilai yang berlaku di masa lalu",
    ],
    correct: "Pelaksanaan nilai-nilai instrumental dalam kehidupan nyata",
  },
  {
    question: "Menurut pandangan ideologi integralistik, negara adalah…",
    options: [
      "Kesatuan yang terdiri dari golongan yang terpisah",
      "Kumpulan individu tanpa keterkaitan",
      "Suatu susunan masyarakat yang integral dan organis",
      "Kumpulan aturan yang bersifat individualistik",
    ],
    correct: "Suatu susunan masyarakat yang integral dan organis",
  },
  {
    question: "Apa yang dimaksud dengan ideologi terbuka?",
    options: [
      "Ideologi yang dapat digantikan",
      "Ideologi yang tetap, tetapi fleksibel dalam penerapannya",
      "Ideologi yang bebas berubah sesuai kebutuhan",
      "Ideologi yang diambil dari negara lain",
    ],
    correct: "Kelangkaan komoditas tertentu",
  },
  {
    question:
      "Apa yang menjadi salah satu batasan bagi Pancasila sebagai ideologi terbuka?",
    options: [
      "Mengikuti semua perubahan global",
      "Penerimaan terhadap ideologi komunis",
      "Menghindari norma baru tanpa konsensus",
      "Menghapus nilai dasar Pancasila",
    ],
    correct: "Menghindari norma baru tanpa konsensus",
  },
  {
    question: "Bagaimana Pancasila berfungsi sebagai ideologi negara?",
    options: [
      "Sebagai perangkat hukum yang mengikat secara internasional",
      "Sebagai cita-cita yang tidak boleh diubah",
      "Sebagai pedoman yang menyatukan langkah bangsa",
      "Sebagai aturan politik tertinggi",
    ],
    correct: "Sebagai pedoman yang menyatukan langkah bangsa",
  },
  {
    question: "Apa dasar dari kajian aksiologi Pancasila?",
    options: [
      "Nilai kebebasan mutlak",
      "Hakikat manusia dalam masyarakat",
      "Manfaat praktis dari nilai-nilai Pancasila",
      "Kebenaran filosofis absolut",
    ],
    correct: "Manfaat praktis dari nilai-nilai Pancasila",
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
