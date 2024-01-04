let timeLeft = 60; // 1 minute in seconds
let timerInterval;
let currentQuestionIndex = 0;
let score = 0; // Track the score
let storedResults = [];
let correctAnswerCount = 0; //variable for correct answer count

//quiz questions array
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
    {
      question: 'What do all escape characters (backspace, tab, etc) begin with?',
      choices: ['#', '/', '&', '%'],
      correctAnswer: 1
    },
    {
      question: 'How are multi-line comments formated?',
      choices: ['//comments//', '/*comments*/', '<!--comments-->', '#comments#'],
      correctAnswer: 1
    },
    {
      question: 'What does array_name.length return?',
      choices: ['Specifies the length of the array', 'Limits the array length', 'Returns the length of the array', 'Creates a new array named length'],
      correctAnswer: 2
    },
    {
      question: 'Which is NOT as primitive type in JS?',
      choices: ['boolean', 'undefined', 'symbol', 'integer'],
      correctAnswer: 3
    },
  ];

/* Use a button, once the user clicks, a question is presented and a timer starts
 timer runs out, questions are cleared, save score and initials form appears*/
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    document.getElementById('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      // alert('Timer is up!');
      const messageDiv = document.getElementById('messages');
      messageDiv.textContent = 'Time is up!';
      
      const scoreDiv = document.getElementById('score-message');
      scoreDiv.textContent = `Quiz is over! Your score: ${score}/6`;

      // alert(`Quiz is over! Your score: ${score}/6 correct `);
      document.getElementById('show-questions').style.display = 'none';
      document.getElementById('save-score').style.display = 'block';
    } else {
      timeLeft--;
    }
}

/* timer starts function */
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

/* once 'start quiz' is pressed, questions show */
function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const questionTextElement = document.getElementById('question-text');
    const choiceButtons = document.querySelectorAll('.choice-btn');
    document.getElementById('clear-results').addEventListener('click', clearResults);
    questionTextElement.textContent = currentQuestion.question;

    choiceButtons.forEach((button, index) => {
      button.textContent = currentQuestion.choices[index];
      button.onclick = () => checkAnswer(index);
    });
}

/*check for correct answer, modify score and time accordingly. WHen all questions answered, 
show score save form */
function checkAnswer(selectedIndex) {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correctAnswer) {
      // Update correct answer count
      correctAnswerCount++;
      // Update the HTML element to display the current correct answer count
      document.getElementById('correct-count').textContent = correctAnswerCount;//  correct answer (e.g., update score)
      //correct answer message
      const messageDiv = document.getElementById('messages');
      messageDiv.textContent = 'Correct!';
      score++; 

    } else {
      //  incorrect answer, reduce time by 10 seconds
      const messageDiv = document.getElementById('messages');
      messageDiv.textContent = 'Sorry, incorrect!';
      timeLeft = Math.max(0, timeLeft - 10);
    }
    
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
/* When all questions are answered, quiz is over */
      clearInterval(timerInterval);
      // alert(`Quiz is over! Your score: ${score}/6 correct`);
      const scoreDiv = document.getElementById('score-message');
      scoreDiv.textContent = `Quiz is over! Your score: ${score}/6`;

      document.getElementById('show-questions').style.display = 'none';
      document.getElementById('save-score').style.display = 'block';
      document.getElementById('past-results-div').style.display = 'none';
    }
}

/* WHen starting quiz, hide start button, quiz directions, show questions
block and questions and timer, set timer */
function startQuiz() {
  
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('quiz-dir').style.display = 'none';
    document.getElementById('past-results-div').style.display = 'none';
    document.getElementById('show-questions').style.display = 'block';
    document.getElementById('show-timer').style.display = 'block';
    
    // Start the timer
    timerInterval = setInterval(updateTimer, 1000);

    // Show the first question
    showQuestion();
}

/* various eventlisteners */
document.getElementById('save-scorebtn').addEventListener('click', saveScore);
document.getElementById('show-past-results').addEventListener('click', showPastResults);
document.getElementById('clear-results').addEventListener('click', clearResults);
document.getElementById('start-btn').addEventListener('click', startQuiz);

/* Function to save the score to local storage */
function saveScore() {
  
  const initials = document.getElementById('initials').value;

  const scoreEntry = {
    initials: initials,
    score: score
  };

  // Load existing scores from local storage
  const storedResults = JSON.parse(localStorage.getItem('allScores')) || [];

  // Append the new score to the existing scores
  storedResults.push(scoreEntry);

  // Save the updated scores to local storage
  localStorage.setItem('allScores', JSON.stringify(storedResults));

  location.reload()
 
}

/* Function to clear all results (DOESN'T WORK!!)*/
function clearResults() {
    // Clear the pastResults array and update the display
    storedResults = [];
    localStorage.setItem("allScores", JSON.stringify(storedResults))
    showPastResults();
}

/* Function to display past results */
function showPastResults() {
    const pastResultsList = document.getElementById('past-results-list');
    // // Clear existing results
    pastResultsList.innerHTML = '';

    const storedResults = JSON.parse(localStorage.getItem('allScores')) || []
    
    //sort results by score
    storedResults.sort((a, b) => b.score - a.score);

  /*USE this code and comment out below code if you want all scores 
     to save rather than the top 5
      storedResults.forEach((result, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${result.initials}: ${result.score}`;
      pastResultsList.appendChild(listItem);
     });
  */
   
    // change '5' here to another number if want different # of scores saved
    const limitedResults = storedResults.slice(0, 5);

    limitedResults.forEach((result, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${result.initials}: ${result.score}`;
      pastResultsList.appendChild(listItem);
    });

    // Show the past results section
    document.getElementById('past-results-div').style.display = 'block';
}


/*The timer starts once button clicked (eventlistener?)

 a message appears telling user to answer the questions

a) Presented with question and multiple choice answers
    buttons change/highlight on hover
 b) If click correct answer, a counter ++ adds to the correct count (goes to local storage)
 c) if click correct answer an alert button (or html text?) says the answer is correct

 d) else, if incorrect answer, an alert button says answer is wrong and counter ++ adds to wrong count

once the  question is answered, goes to the next question and repeats a-d

when timer runs out, quiz over
when all questions answered, quiz over

when quiz is over, score is presented for local storage, initials are requested and shown. */