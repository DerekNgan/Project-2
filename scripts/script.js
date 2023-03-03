import firebaseInfo from "./firebaseConfig.js"
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const database = getDatabase(firebaseInfo);
const dbRef = ref(database);

// DATA FOR QUESTIONS AND ANSWERS
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

// DATA FOR USER SCORE
const score = {
    userScore: 0
};

function randomArrVal(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
}

// call this function when want new set of questions to load
function questionLoad() {
    // GENERATE RANDOM QUESTION

    // Generate a RANDOM QUESTION ARRAY from questiontype array -> returns an entire array
    const currentQuestionType = randomArrVal(questionType);
    // console.log(currentQuestionType);
    // generate RANDOM QUESTION OBJECT from selected question type -> returns question object
    const currentQuestionObj = randomArrVal(currentQuestionType);
    // console.log(currentQuestionObj)

    // UPDATE QUESTION TEXT
    // variable for question element (h2)
    const questionDisplay = document.getElementById('question')
    // console.log(questionDisplay);

    // using SELECTED QUESTION OBJ and updating question text content
    questionDisplay.textContent = currentQuestionObj.question

    // DYNAMIC UPDATING EACH ANSWER

    // 1) variable for answer box
    const currentAnswers = currentQuestionObj.answers
    // creating an element for EACH item in our answers array

    const answerBox = document.getElementById('answersContainer');
    // clearing all items in answer box === clearing all html elements in the box
    answerBox.innerHTML = '';

    currentAnswers.forEach(function (answer) {

        // 2) create button element 
        const createButton = document.createElement('button')
        // 3) adjust button w VALUE base on its index in the answers array + 1
        // button USER EXPERIENCE
        // adding string value from currentanswers array to our button AS TEXT
        createButton.textContent = answer;

        // button properties
        // id
        createButton.id = `btn${currentAnswers.indexOf(answer) + 1}`;
        // value
        createButton.value = currentAnswers.indexOf(answer) + 1;

        // console.log(createButton)

        // 4) append to answer container 
        answerBox.appendChild(createButton);
    })

    // NEXT FUNCTIONALITY: Move our data to Firebase
    // // consider having our data in a JSON file - import it once into firebase!
    // // refactor ALL paths with finding our data (from question load function). make sure we are interacting with the firebase data




    // NEXT FUNCTIONALITY: user click = answer evaluation
    // // GOAL: when the user clicks on an answer, check IF the button value === correct answer value

    function answerEval(event) {
        // establish button is being clicked
        if (event.target.tagName === 'BUTTON') {

            //converting value to number to compare
            const currentButton = parseInt(event.target.value);

            // console.log(currentButton);

            const currentCorrectAnswer = currentQuestionObj.correctAnswer
            if (currentButton === currentCorrectAnswer) {
                // // // // IF the button value === correct answer value, grant user score +1 point AND add a class of correct to the label

                console.log('yeeeaaaa boiii');
                score.userScore++;
                // console.log(score.userScore)
            } else {
                // // // // ELSE user score -1 dd a class of correct to the label
                console.log('nooooo boiii');
                score.userScore--;
                // console.log(score.userScore)
            }

            console.log(score.userScore)
        }

    }

    answerBox.addEventListener('click', answerEval)
    // // // listen for a click in PARENT OBJECT for buttons (since they are generated after pageload, we cannot have an eventlistener directly linked)


}

questionLoad();



