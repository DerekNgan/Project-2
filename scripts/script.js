import firebaseInfo from "./firebaseConfig.js"
import { get, getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const database = getDatabase(firebaseInfo);
const dbRef = ref(database);

// SPECIFIC OBJECT REFS
// const fourAnswerRef = ref(database, `/fourAnswerQuestions`);

// const trueFalseRef = ref(database, `/trueFalseQuestions`);

// const questionTypeRef = ref(database, `/questionType`);

const currentAnswerRef = ref(database, `/currentAnswer`)
const scoreRef = ref(database, `/score`);

// HTML VARIABLES
const questionDisplay = document.getElementById('question')

const answerBox = document.getElementById('answersContainer');


// MISC VARIABLES
let currentCorrectAnswer = '';
let localScore = 0;

// FUNCTIONS


function randomArrVal(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
}

const changeSetting = (ref, settingChange) => {
    return update(ref, settingChange)
}

function getQuestion() {
    get(dbRef).then(function (snapshot) {
        if (snapshot.exists()) {
            //loggin the entire object
            const mainObj = snapshot.val()
            // console.log(mainObj)
            const questionTypeRef = mainObj.questionType;

            // GENERATING RANDOM QUESTION TYPE
            const randomQType = randomArrVal(questionTypeRef)

            // dot notation TAKES THINGS LITERALLY
            // bracket notation takes things FIGURATIVELY

            // console.log(mainObj[randomQType])

            // GENERATING RANDOM QUESTION FROM SELECTED QUESTION TYPE
            const randomQuestion = randomArrVal(mainObj[randomQType])

            // console.log(randomQuestion)

            // HTML: POPULATE QUESTION 
            questionDisplay.textContent = randomQuestion.question

            // HTML: POPULATE EACH ANSWER DYNAMICALLY

            // all possible answers FOR random questions
            const currentAnswersArr = randomQuestion.answers
            console.log(currentAnswersArr)

            // target each answer -> forEach
            // make a button for each answer
            // put id and value for each button
            // value = index + 1
            answerBox.innerHTML = '';
            currentAnswersArr.forEach(function (answer) {
                const newBtn = document.createElement('button')
                newBtn.id = `btn${currentAnswersArr.indexOf(answer) + 1}`;
                newBtn.value = currentAnswersArr.indexOf(answer) + 1;
                // display answer inside button
                newBtn.textContent = answer;
                // console.log(newBtn)
                // append each button to answerBox
                answerBox.appendChild(newBtn)
            })

            const correctObj = { currentAnswer: randomQuestion.correctAnswer };

            update(dbRef, correctObj);


        } else {
            console.log('OAUR NAUR - NAUR QUESTIN AUR AURNSWER');
        }
    })
}


getQuestion();

function answerEval(event) {
    // ONLY ON BTN CLICK
    if (event.target.tagName === 'BUTTON') {

        const clickedAnswer = parseInt(event.target.value)

        // GET DB CURRENT ANSWER
        get(dbRef).then(function (snapshot) {

            if (snapshot.exists()) {
                const currentAnswerPath = snapshot.val().currentAnswer

                // comparing clicked btn value to DB current answer
                if (clickedAnswer === currentAnswerPath) {
                    console.log('yippy')
                    localScore++;
                    console.log(localScore)
                    //update DB score
                    // run get question
                    getQuestion();
                } else {
                    console.log('fuck')
                    localScore--;
                    console.log(localScore)
                    //update DB score
                    // run get question
                    getQuestion();
                }

            } else {
                console.log('cannot reach database - current answer')
            }
        })

    }
}



answerBox.addEventListener('click', answerEval)

// get() -> get current score data
//  add 1 to current score data AS OBJ
// update DB w new obj


// ----------------------------------------------


// onValue func for user score! to immediately get most up to date score



// call this function when want new set of questions to load


// questionLoad();

const startBtn = document.querySelector('#startBtn');
const playBtn = document.querySelector('#playBtn');
const resetBtn = document.querySelector('#resetBtn');
const startState = document.querySelector('#start');
const playState = document.querySelector('#play');
const resetState = document.querySelector('#reset');

function changeState(hiddenState, activeState) {
    // when start button is pressed, start state is hidden and play state appears
    hiddenState.classList.add('hidden');
    activeState.classList.remove('hidden');
}

startBtn.addEventListener('click', function () {
    // hiding start state and activating playstate
    changeState(startState, playState);
    // timer start

})

//after timer end run changeState() so now the hidden state will be play state and the active state is the reset state
resetBtn.addEventListener('click', function () {
    // hiding start state and activating playstate
    changeState(resetState, startState);
    // timer start
})
// once at reset state when reset button is pressed active state will be the start state