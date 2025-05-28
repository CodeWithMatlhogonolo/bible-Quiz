const quizData = [
  {
    question: "What was the name of the high priest who questioned Jesus before His crucifixion?",
    options: ["Caiphus", "Annas", "Nicodemus", "Gamaliel"],
    answer: "Caiphus"
  },
  {
    question: "In the book of Revelation, how many churches were addressed in John's vision?",
    options: [10, 3, 7, 12],
    answer: 7
  },
  {
    question: "Who interpreted Pharaoh’s dream about the seven fat and seven thin cows?",
    options: ["Moses", "Joseph", "Daniel", "Aaron"],
    answer: "Joseph"
  },
  {
    question: "What language was most of the Old Testament originally written in?",
    options: ["Latin", "Greek", "Hebrew", "Aramaic"],
    answer: "Hebrew"
  },
  {
    question: "Which prophet saw a vision of a valley full of dry bones?",
    options: ["Isaiah", "Jeremiah", "Ezekiel", "Elijah"],
    answer: "Ezekiel"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;
const totalQuestions = quizData.length;

const timerEl = document.getElementById("time");
const questionEl = document.querySelector(".question");
const optionsEl = document.querySelector(".options");
const resultEl = document.querySelector(".result");
const scoreEl = document.getElementById("score");
const restartBtn = document.querySelector(".restart-btn");
const previousBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Update progress bar and text
function updateProgressBar() {
  let percentComplete = Math.round(((currentQuestion + 1) / totalQuestions) * 100);
  const progress = document.querySelector(".progress");
  progress.style.width = percentComplete + "%";
  document.getElementById("question-number").textContent = `Question ${currentQuestion + 1} of ${totalQuestions}`;
  document.getElementById("percent").textContent = `${percentComplete}% Complete`;
}

// Load current question
function loadQuestion() {
  if (currentQuestion >= totalQuestions) {
    endQuiz();
    return;
  }

  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = currentQuiz.question;
  optionsEl.innerHTML = "";

  currentQuiz.options.forEach(option => {
    const button = document.createElement("button");
    button.classList.add("option");
    button.textContent = option;
    button.onclick = () => checkAnswer(option);
    optionsEl.appendChild(button);
  });

  updateProgressBar();
}

// Check user answer
function checkAnswer(selectedOption) {
  if (selectedOption === quizData[currentQuestion].answer) {
    score++;
  }

  if (currentQuestion < totalQuestions - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    endQuiz();
  }
}

// Previous button handler
function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

// Next button handler (in case user wants to skip)
function nextQuestion() {
  if (currentQuestion < totalQuestions - 1) {
    currentQuestion++;
    loadQuestion();
  }
}

// End quiz and show score
function endQuiz() {
  clearInterval(timerInterval);

  document.querySelector(".quiz-container").style.display = "none";
  document.querySelector(".navigation").style.display = "none";
  document.querySelector(".progress-container").style.display = "none";

  document.querySelector(".score-container").style.display = "flex";
  scoreEl.textContent = score;
  restartBtn.style.display = "inline-block";
}

// Restart quiz
function restartQuiz() {
  score = 0;
  currentQuestion = 0;
  timeLeft = 30;

  document.querySelector(".quiz-container").style.display = "block";
  document.querySelector(".navigation").style.display = "flex";
  document.querySelector(".progress-container").style.display = "block";
  document.querySelector(".score-container").style.display = "none";
  restartBtn.style.display = "none";

  loadQuestion();
  startTimer();
}

// Timer logic
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 30;
  timerEl.textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // Automatically move to next question when timer runs out
      if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        loadQuestion();
        startTimer();
      } else {
        endQuiz();
      }
    }
  }, 1000);
}

previousBtn.addEventListener("click", () => {
  prevQuestion();
  startTimer();
});

nextBtn.addEventListener("click", () => {
  nextQuestion();
  startTimer();
});

restartBtn.addEventListener("click", restartQuiz);

// Initialize first question and start timer
loadQuestion();
startTimer();
