let startBtn = document.getElementById('start-btn');
let timeLeft = 120; // 2 minutes in seconds
let timerInterval;
let currentQuestionIndex = 0;
let score = 0; // Track the score
let pastResults = [];


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
      //  correct answer (e.g., update score)
      alert('Correct!');
      score++; 
    } else {
      //  incorrect answer (e.g., reduce score)
      alert('Incorrect!');
      score = Math.max(0, score - 1);
      timeLeft = Math.max(0, timeLeft - 10);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      // When all questions are answered, quiz is over
      clearInterval(timerInterval);
      alert(`Quiz is over! Your score: ${score}`);
      document.getElementById('show-questions').style.display = 'none';
      document.getElementById('save-score').style.display = 'block';
    }
  }

  function startQuiz() {
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('show-questions').style.display = 'block';
    document.getElementById('show-timer').style.display = 'block';

    // Start the timer
    timerInterval = setInterval(updateTimer, 1000);

    // Show the first question
    showQuestion();
  }

document.getElementById('start-btn').addEventListener('click', startQuiz);

// Function to save the score
function saveScore() {
  console.log('Save Score clicked'); // Debugging statement  
  const initials = document.getElementById('initials').value;

    // Create an object to represent the score entry
    const scoreEntry = {
        initials: initials,
        score: score
    };

    // Push the score entry to the array
    pastResults.push(scoreEntry);

    // Sort the array by score in descending order
    pastResults.sort((a, b) => b.score - a.score);

    // Store the top 5 scores in local storage
    const top5Results = pastResults.slice(0, 5);
    localStorage.setItem('topScores', JSON.stringify(top5Results));

    // Display past results
    showPastResults();
}
document.getElementById('save-scorebtn').addEventListener('click', saveScore);
document.getElementById('show-past-results').addEventListener('click', showPastResults);
document.getElementById('clear-results').addEventListener('click', clearResults);

// Function to clear all results
function clearResults() {
    // Clear the pastResults array and update the display
    pastResults = [];
    showPastResults();
}

// Function to display past results
function showPastResults() {
    const pastResultsList = document.getElementById('past-results-list');

    // Clear existing results
    pastResultsList.innerHTML = '';

    // Display the top 5 results
    pastResults.slice(0, 5).forEach((result, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${result.initials}: ${result.score}`;
        pastResultsList.appendChild(listItem);
    });

    // Show the past results section
    document.getElementById('past-results-div').style.display = 'block';
}
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