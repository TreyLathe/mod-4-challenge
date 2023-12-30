//list variables based on html ids (might not need them all for javascri[tp-])
// ask if document is needed here:
// let startDisplay = document.getElementById('start-display');
let startBtn = document.getElementById('start-btn');
// let showTimer = document.getElementById('show-timer');
// let timer = document.getElementById('timer');
// let showQuestions = document.getElementById('show-questions');
// let questions = document.getElementById('questions');
// let options = document.querySelectorAll('options');
// let saveScore = document.getElementById('save-score');
// let enterInitials = document.getElementById('enter-initials');
// let saveScoreBtn = document.getElementById('save-scorebtn');
// let showResults = document.getElementById('show-results');
// let showPastResults = document.getElementById('show-past-results');
// let clearResults = document.getElementById('clear-results');
// let pastResultsDiv = document.getElementById('past-results-div');
// let pastResultsList = document.getElementById('past-results-list');

// other variables for within javascript
let timeLeft = 120; // 2 minutes in seconds
let timerInterval;
let currentQuestionIndex = 0;

const quizQuestions = [
    {
      question: 'What is the condition in an if/else statement enclosed with?',
      choices: ['curly brackets', 'square brackets', 'paranthesis', 'double quotes'],
      correctAnswer: 2 // Index of the correct answer in the choices array
    },
    {
      question: 'What does DOM stand for?',
      choices: ['Document Object Model', 'Document Origin Model', 'Document Object Method', 'Document Origin Method'],
      correctAnswer: 0
    },

  ];

  


//Use a button, once the user clicks, a question is presented and a timer starts
//timer

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    document.getElementById('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      alert('Timer is up!');
    } else {
      timeLeft--;
    }
  }

  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
  }

  function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const questionTextElement = document.getElementById('question-text');
    const choiceButtons = document.querySelectorAll('.choice-btn');

    questionTextElement.textContent = currentQuestion.question;

    choiceButtons.forEach((button, index) => {
      button.textContent = currentQuestion.choices[index];
      button.onclick = () => checkAnswer(index);
    });
  }

  function checkAnswer(selectedIndex) {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correctAnswer) {
      // Handle correct answer (e.g., update score)
      alert('Correct!');
    } else {
      // Handle incorrect answer (e.g., reduce score)
      alert('Incorrect!');
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      // All questions answered, quiz is over
      clearInterval(timerInterval);
      alert('Quiz is over!');
      // Optionally, you can handle what happens when the quiz is over (e.g., show results).
    }
  }

  function startQuiz() {
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('show-questions').style.display = 'block';

    // Start the timer
    timerInterval = setInterval(updateTimer, 1000);

    // Show the first question
    showQuestion();
  }

document.getElementById('start-btn').addEventListener('click', startQuiz);


//The timer starts once button clicked (eventlistener?)

// a message appears telling user to answer the questions

// a) Presented with question and multiple choice answers
//    buttons change/highlight on hover
// b) If click correct answer, a counter ++ adds to the correct count (goes to local storage)
// c) if click correct answer an alert button (or html text?) says the answer is correct

// d) else, if incorrect answer, an alert button says answer is wrong and counter ++ adds to wrong count

//once the  question is answered, goes to the next question and repeats a-d

//when timer runs out, quiz over
//when all questions answered, quiz over

//when quiz is over, score is presented for local storage, initials are requested and shown.