//list variables based on html ids (might not need them all for javascri[tp-])
// ask if document is needed here:
let startDisplay = document.getElementById('start-display');
let startQuiz = document.getElementById('start-quiz');
let showTimer = document.getElementById('show-timer');
let timer = document.getElementById('timer');
let showQuestions = document.getElementById('show-questions');
let questions = document.getElementById('questions');
let options = document.querySelectorAll('options');
let saveScore = document.getElementById('save-score');
let enterInitials = document.getElementById('enter-initials');
let saveScoreBtn = document.getElementById('save-scorebtn');
let showResults = document.getElementById('show-results');
let showPastResults = document.getElementById('show-past-results');
let clearResults = document.getElementById('clear-results');
let pastResultsDiv = document.getElementById('past-results-div');
let pastResultsList = document.getElementById('past-results-list');

// other variables for within javascript
let questionList = [
    {
        question: '',
        options: ['', '', '', ''],
        correctOption: ''
    },
    {
        question: '',
        options: ['', '', '', ''],
        correctOption: ''
    },
    {
        question: '',
        options: ['', '', '', ''],
        correctOption: ''
    },
    {
        question: '',
        options: ['', '', '', ''],
        correctOption: ''
    },
    {
        question: '',
        options: ['', '', '', ''],
        correctOption: ''
    },
  ];

//Use a button, once the user clicks, a question is presented and a timer starts

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