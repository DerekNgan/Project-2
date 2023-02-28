import firebaseInfo from "./firebaseConfig.js"
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

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

function randomArrVal(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
}

// call this function when want new set of questions to load
function questionLoad() {
    // GENERATE RANDOM QUESTION

    // Generate a RANDOM QUESTION ARRAY from questiontype array -> returns an entire array
    const currentQuestionType = randomArrVal(questionType);
    console.log(currentQuestionType);
    // generate RANDOM QUESTION OBJECT from selected question type -> returns question object
    const currentQuestionObj = randomArrVal(currentQuestionType);
    console.log(currentQuestionObj)

    // UPDATE QUESTION TEXT
    // variable for question element (h2)
    const questionDisplay = document.getElementById('question')
    console.log(questionDisplay);

    // using SELECTED QUESTION OBJ and updating question text content
    questionDisplay.textContent = currentQuestionObj.question

    // DYNAMIC UPDATING EACH ANSWER

    // 1) variable for answer box
    const currentAnswers = currentQuestionObj.answers
    // creating an element for EACH item in our answers array


    currentAnswers.forEach(function (answer) {
        const answerBox = document.getElementById('answersContainer');
        // 2) create label element 
        const labelEl = document.createElement('label');
        // 3) .innerHTML input 
        labelEl.innerHTML = `<input type="radio" id="btn">`
        // 4) append to answer container 
        answerBox.appendChild(labelEl)

        // TO DO BEFORE MOVING ON: ADJUST HTML FOR LABEL AND INPUT ELEMENT
        // // GOAL: differentiate each label/input element according its consecutive order AND assign each pair a value to be compared later

        // // // we need to have each set of label/input  pairing be connected (via for and id attribute in HTML)
        // // // have each input id have its button number (so instead of just id="btn" -> id="btn1" id="btn2" etc)
        // // // have each label for attribute match the button id (so instead of just for="btn" -> for="btn1" for="btn2" etc)
        // // // add value attribute to input element 

    })
    // NEXT FUNCTIONALITY: Move our data to Firebase
    // // consider having our data in a JSON file - import it once into firebase!
    // // refactor ALL paths with finding our data (from question load function). make sure we are interacting with the firebase data

    // NEXT FUNCTIONALITY: user click = answer evaluation
    // // GOAL: when the user clicks on an answer, check IF the input value === correct answer value

    // // // listen for a click in PARENT OBJECT for buttons (since they are generated after pageload, we cannot have an eventlistener directly linked)

    // // // have a function run a conditional statement
    // // // // IF the input value === correct answer value, grant user score +1 point AND add a class of correct to the label
    // // // // ELSE user score -1 dd a class of correct to the label
}
questionLoad();



