let quizData = [
  {
    question: "Apa tujuan dari memahami sejarah perjuangan bangsa?",
    options: [
      "Untuk memuliakan tokoh pahlawan",
      "Agar bisa memahami makna Pancasila",
      "Supaya bisa mencontoh negara lain",
      "Hanya sebagai pelajaran sejarah",
    ],
    correct: "Agar bisa memahami makna Pancasila",
  },
  {
    question: "Apa yang dimaksud dengan multikulturalisme?",
    options: [
      "Ideologi yang menyatukan semua budaya",
      "Sikap yang mengutamakan satu budaya",
      "Pengakuan terhadap keberagaman budaya",
      "Hanya budaya mayoritas yang dihargai",
    ],
    correct: "Pengakuan terhadap keberagaman budaya",
  },
  {
    question: "Apa tujuan dari teori multikulturalisme 'Salad Bowl'?",
    options: [
      "Penyatuan budaya dalam satu wadah",
      "Pembauran budaya tanpa kehilangan identitas",
      "Dominasi budaya mayoritas",
      "Asimilasi penuh dengan budaya lokal",
    ],
    correct: "Pembauran budaya tanpa kehilangan identitas",
  },
  {
    question:
      "Apa yang menjadi salah satu ancaman terhadap kehidupan berbangsa di Indonesia?",
    options: [
      "Peningkatan ekonomi",
      "Kelangkaan komoditas tertentu",
      "Meningkatnya pendidikan",
      "Semakin banyak mahasiswa",
    ],
    correct: "Kelangkaan komoditas tertentu",
  },
  {
    question:
      "Apa makna dari semboyan 'JASMERAH' yang dikemukakan oleh Soekarno?",
    options: [
      "Jangan melupakan jasa para pahlawan",
      "Jangan melupakan sejarah",
      "Jangan merendahkan budaya sendiri",
      "Jangan mengagungkan budaya lain",
    ],
    correct: "Jangan melupakan sejarah",
  },
  {
    question:
      "Peran mahasiswa dalam kehidupan berbangsa adalah sebagai berikut, kecuali?",
    options: [
      "Penggerak pembangunan",
      "Motivator pembangunan",
      "Pengisi posisi pemerintahan",
      "Evaluator pembangunan",
    ],
    correct: "Pengisi posisi pemerintahan",
  },
  {
    question:
      "Menurut Samuel P. Huntington, apa yang memicu konflik antarperadaban di masa depan?",
    options: [
      "Perbedaan politik",
      "Ideologi kapitalisme",
      "Faktor SARA",
      "Faktor ekonomi",
    ],
    correct: "Faktor SARA",
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
