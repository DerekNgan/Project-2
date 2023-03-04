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
const questionDisplay = document.getElementById('question');
const yourHighScore = document.getElementById('yourHighScore');
const yourLocalScore = document.getElementById('yourLocalScore');


// PLAY STATE
let timeLeft = 10;
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const answerBox = document.getElementById('answersContainer');


// MISC VARIABLES
let localScore = 0;

// FUNCTIONS


function randomArrVal(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
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
                newBtn.classList.add('answerButton');
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



function answerEval(event) {
    // ONLY ON BTN CLICK
    if (event.target.tagName === 'BUTTON') {

        const clickedAnswer = parseInt(event.target.value)

        // GET DB CURRENT ANSWER
        get(dbRef).then(function (snapshot) {


            if (snapshot.exists()) {
                const currentAnswerPath = snapshot.val().currentAnswer

                // comparing clicked btn value to DB currentanswer
                if (clickedAnswer === currentAnswerPath) {
                    //CORRECT ANSWER
                    localScore++;
                    // display local score to
                    scoreDisplay.textContent = localScore;
                    // delay .5s and then get question
                    event.target.classList.add('correct');
                    setTimeout(getQuestion, 500);
                    //Delete CURRENT QUESTION DATA from Firebase to avoid duplicate 

                } else {
                    //CORRECT ANSWER
                    localScore--;
                    scoreDisplay.textContent = localScore;
                    // delay .5s and then get question
                    event.target.classList.add('incorrect');
                    setTimeout(getQuestion, 500);
                    //Delete CURRENT QUESTION DATA from Firebase to avoid duplicate 

                }

            } else {
                console.log('cannot reach database - current answer')
            }
        })

    }
}


function playTimer() {
    // JS timer 
    function countdown() {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft > 0) {
            setTimeout(countdown, 1000);
        }

        // STLYING FOR FINAL FIVE SECONDS
        if (timeLeft === 5) {
            bar.style.opacity = '0.25';
        } else if (timeLeft === 4) {
            bar.style.opacity = '1';
        } else if (timeLeft === 3) {
            bar.style.opacity = '0.25';
        } else if (timeLeft === 2) {
            bar.style.opacity = '1';
        } else if (timeLeft === 1) {
            bar.style.opacity = '0.25';
        } else {
            bar.style.opacity = '1';
        }

        //Once timeLeft = 0, we will use changeState function to hide. Hide playState to make resetState appear 

        if (timeLeft === 0) {
            //Save the userName locally 
            //Upload to Firebase when the timer runs out 
            //Issue having variable as object key 
            //Creating key 
            //Creating empty object 
            //Assigning value to key in object 
            //BECAUSE there is no key or value in the object, it will create it for us 
            const key =  `${userName}`
            const userScore = {}
            userScore [key] = localScore;
            // console.log(userScore);
               
        
            update (scoreRef, userScore)
            //Update () userName, localScore @scoreRef 
            //get () high score from dB
            get (scoreRef).then (function(data) {
                if (data.exists()){
                    console.log (data.val()[userName]) 
                    console.log (data.val().key) 


                } else {
                    console.log ('sorry no data found')
                }
            
            })
            //Display highscore at reset state

            //Display LOCAL userName reset state

            //Display LOCAL score at reset state 
            yourLocalScore.textContent = `${userName}: ${localScore} points` 

            changeState(playState, resetState);
        }
    };

    setTimeout(countdown, 1000);


    const bar = document.querySelector('#bar');
    let timeLimit = `${String(timeLeft)}s`;
    bar.style.animationDuration = timeLimit;
    console.log()
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

// startBtn.addEventListener('click', function () {
//     // hiding start state and activating playstate
//     changeState(startState, playState);
//     // localScore is reset to 0 
//     localScore = 0;
//     // get question on button press - CHANGE IF LAG IS REAL
//     getQuestion();
//     //time is shown
//     timeDisplay.textContent = timeLeft;
//     // timer starts
//     playTimer();

// })




let userName = ""

// add a form + label + input to start state HTML
// change button eventlistener to formeventlistener

const nameForm = document.getElementById ('nameForm')
const nameInput = document.getElementById ('nameInput')
nameForm.addEventListener('submit', function(event) {
    event.preventDefault ();
    // console.log (nameInput.value)
    userName = nameInput.value
    // console.log(userName)

  // hiding start state and activating playstate
  changeState(startState, playState);
  // localScore is reset to 0 
  localScore = 0;
  // get question on button press - CHANGE IF LAG IS REAL
  getQuestion();
  //time is shown
  timeDisplay.textContent = timeLeft;
  // timer starts
  playTimer();

});


 













//after timer end run changeState() so now the hidden state will be play state and the active state is the reset state
resetBtn.addEventListener('click', function () {
    // hiding start state and activating playstate
    changeState(resetState, startState);

})


//Reset the firebase questions 