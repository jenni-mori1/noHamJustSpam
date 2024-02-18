const myForm = document.getElementById('textForm');

myForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch('text.php', {
        method: 'post',
        body: formData
    }).then(function(response) {
        return response.text();
    }).then(function(text) {
        console.log(text);
    }).catch(function(error) {   
        console.error(error);
    })

});
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
    }
    // Add more questions here
];

let currentQuestionIndex = 0;
let score = 0;

loadQuestion();

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    console.log(currentQuestion.question);
    console.log("Choices:");
    currentQuestion.choices.forEach(choice => {
        console.log(choice);
    });
    // You can handle user input here in the console or write your own input logic
    // For example:
    // const userChoice = getUserChoice(); // Implement getUserChoice() to get user input
    // checkAnswer(userChoice);
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
    console.log(`You scored ${score} out of ${quizData.length}.`);
    if (score === quizData.length) {
        console.log("Wow! You got all questions right. Great job!");
    } else if (score >= quizData.length / 2) {
        console.log("Not bad! You got more than half of the questions right.");
    } else {
        console.log("Better luck next time!");
    }
}

function sendText() {
    // Example code for sending text to a server (you'll need to set up a server)
    const enteredText = "Your text to send to the server";
    fetch('http://your-server-url/save-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: enteredText })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the response from the server
        // Handle the response from the server if needed
    })
    .catch(error => {
        console.error('Error:', error); // Log any errors that occur
    });
}