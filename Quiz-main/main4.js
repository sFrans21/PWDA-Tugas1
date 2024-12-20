let quizData = [
  {
    question:
      "Apa makna dari identitas nasional menurut konsep yang disampaikan dalam materi?",
    options: [
      "Identitas kelompok yang melekat pada setiap individu",
      "Identitas yang dibentuk berdasarkan wilayah geografis",
      "Ciri khas yang mengikat masyarakat sebagai satu bangsa",
      "Tanda untuk membedakan antara kelompok lokal dan internasional",
    ],
    correct: "Ciri khas yang mengikat masyarakat sebagai satu bangsa",
  },
  {
    question:
      "Faktor manakah yang dianggap penting dalam pembentukan identitas nasional Indonesia?",
    options: [
      "Kehendak bersama untuk bersatu",
      "Keunggulan ekonomi suatu wilayah",
      "Pengaruh budaya luar yang kuat",
      "Teknologi informasi yang berkembang pesat",
    ],
    correct: "Kehendak bersama untuk bersatu",
  },
  {
    question:
      "Siapakah tokoh yang mendefinisikan bangsa sebagai persatuan karakter karena persatuan nasib?",
    options: ["Ernest Renan", "Otto Bauer", "Mochtar Lubis", "Bung Karno"],
    correct: "Otto Bauer",
  },
  {
    question:
      "Mengapa 'Pancasila' disebut sebagai bagian dari identitas nasional Indonesia?",
    options: [
      "Karena disepakati oleh pemimpin bangsa",
      "Sebagai dasar negara dan falsafah hidup bangsa",
      "Sebagai pedoman teknis dalam pemerintahan",
      "Karena menjadi alat politik yang kuat",
    ],
    correct: "Sebagai dasar negara dan falsafah hidup bangsa",
  },
  {
    question:
      "Menurut konsep ‘Manusia Indonesia Berkualitas,’ apa yang dimaksud dengan ‘pekerja pemikir’?",
    options: [
      "Individu yang memiliki keahlian teknis tinggi",
      "Orang yang mampu berpikir kritis dan kreatif",
      "Pekerja yang ahli di bidang fisik",
      "Orang yang bekerja tanpa bantuan teknologi",
    ],
    correct: "Orang yang mampu berpikir kritis dan kreatif",
  },
  {
    question:
      "Apakah tujuan dari perubahan mindset dalam masyarakat Indonesia, seperti 'bergantung' menjadi 'mandiri'?",
    options: [
      "Mengurangi ketergantungan pada sumber daya alam",
      "Mendorong masyarakat untuk berwirausaha",
      "Meningkatkan kualitas pendidikan nasional",
      "Menciptakan individu yang berdaya dan mandiri",
    ],
    correct: "Menciptakan individu yang berdaya dan mandiri",
  },
  {
    question:
      "Apa urgensi dari integrasi nasional dalam konteks Indonesia saat ini?",
    options: [
      "Memperkuat posisi politik di kawasan Asia",
      "Menjaga eksistensi dan kedaulatan negara",
      "Menarik lebih banyak investor asing",
      "Menyebarkan budaya nasional ke dunia internasional",
    ],
    correct: "Menjaga eksistensi dan kedaulatan negara",
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
