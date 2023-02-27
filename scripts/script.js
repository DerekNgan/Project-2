import firebaseInfo from "./firebaseConfig.js"
import {getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const database = getDatabase(firebaseInfo);
const dbRef = ref(database);

// DATA 
const fourAnswerQuestions = [

    {
        question: 'is this test working?',
        answers: [
            'yes', 'no', 'maybe', 'so'
        ],
        correctAnswer: 1
    },

    {
        question: 'TWO: what is the fastest animal',
        answers: [
            'turtle', 'cheetah', 'walrus', 'pig'
        ],
        correctAnswer: 2
    },

    {
        question: 'THREE what is 7 - 8?',
        answers: [
            '1', '4', '-2', '-1'
        ],
        correctAnswer: 4
    }
]
const trueFalseQuestions = [

    {
        question: 'is this test working?',
        answers: [
            'yes', 'no'
        ],
        correctAnswer: 1
    },

    {
        question: 'TWO: what is the opposite of north',
        answers: [
            'north', 'south'
        ],
        correctAnswer: 2
    },

    {
        question: 'THREE what side of the road do Canadians drive on?',
        answers: [
            'Left', 'Right'
        ],
        correctAnswer: 2
    }
]

const questionType = [
    fourAnswerQuestions, trueFalseQuestions
]

function randomArrVal(arr){
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
}

// call this function when want new set of questions to load
function questionLoad(){
    const currentQuestionType = randomArrVal(questionType);
    console.log(currentQuestionType);
    const currentQuestionObj = randomArrVal(currentQuestionType);
    console.log(currentQuestionObj)
    const questionDisplay = document.getElementById('question')
    console.log(questionDisplay);
    questionDisplay.textContent = currentQuestionObj.question

// dynamically populating answers
    // 1) get the id of the answer box
    const currentAnswers = currentQuestionObj.answers
    currentAnswers.forEach(function(answer){
    const answerBox = document.getElementById('answersContainer');
    // 2) create label element 
    const labelEl = document.createElement('label');
    // 3) .innerHTML input 
    labelEl.innerHTML = `<input type="radio" id="btn">`
    // 4) append to answer container 
    answerBox.appendChild(labelEl)
    })
}
questionLoad();



