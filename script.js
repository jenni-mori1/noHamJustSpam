const quizData = [
  {
      question: "Is this spam? Dear Voucher Holder, To claim this weeks offer, at you PC please go to http://www.e-tlp.co.uk/rewa",
      choices: ["yes", "no"],
      correctAnswer: "yes"
  },
  {
      question: "What is 2 + 2?",
      choices: ["3", "4", "5", "6"],
      correctAnswer: "4"
  },
  // Add more questions here
];

const quizContainer = document.querySelector('.quiz-container');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const submitButton = document.getElementById('submit-btn');
const resultElement = document.getElementById('result');

let currentQuestionIndex = 0;
let score = 0;

loadQuestion();

function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  choicesElement.innerHTML = "";
  currentQuestion.choices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      choicesElement.appendChild(li);
      li.addEventListener('click', () => {
          checkAnswer(choice);
      });
  });
}

function checkAnswer(choice) {
  const currentQuestion = quizData[currentQuestionIndex];
  if (choice === currentQuestion.correctAnswer) {
      score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
      loadQuestion();
  } else {
      showResult();
  }
}

function showResult() {
  quizContainer.style.display = 'none';
  resultElement.textContent = `You scored ${score} out of ${quizData.length}.`;
  if (score === quizData.length) {
      resultElement.innerHTML += "<p>Wow! You got all questions right. Great job!</p>";
  } else if (score >= quizData.length / 2) {
      resultElement.innerHTML += "<p>Not bad! You got more than half of the questions right.</p>";
  } else {
      resultElement.innerHTML += "<p>Better luck next time!</p>";
  }
}