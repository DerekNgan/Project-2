import firebaseInfo from "./firebaseConfig.js"
import { get, getDatabase, ref, update, push, query, orderByChild, limitToFirst, remove } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

import { fourAnswerQuestions, trueFalseQuestions } from "./dataObj.js";

const database = getDatabase(firebaseInfo);
const dbRef = ref(database);

// SPECIFIC OBJECT REFS
// const fourAnswerRef = ref(database, `/fourAnswerQuestions`);

// const trueFalseRef = ref(database, `/trueFalseQuestions`);

// const questionTypeRef = ref(database, `/questionType`);

const scoreRef = ref(database, `/score`);

// HTML VARIABLES
const questionDisplay = document.getElementById('question');
const yourHighScore = document.getElementById('yourHighScore');
const yourLocalScore = document.getElementById('yourLocalScore');


// START STATE
const startState = document.getElementById('start');
const startBtn = document.getElementById('startBtn');
const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');

// PLAY STATE
const playState = document.getElementById('play');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const answerBox = document.getElementById('answersContainer');
const playBtn = document.getElementById('playBtn');

// RESET STATE
const resetBtn = document.getElementById('resetBtn');
const resetState = document.getElementById('reset');
const highScoreDisplay = document.getElementById('yourHighScore')

// MISC VARIABLES
let timeLeft = 500;
let localScore = 0;
let userName = '';


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
            // console.log(currentAnswersArr)

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

            // const currentQRef = ref(database, `/${randomQType}/${randomQType.randomQuestion}`)

            // console.log(randomQType.indexOf(randomQuestion))

            // remove(currentQRef);
            // remove question
            // get current path randomQuestion
            // use remove() to remove :)


            // RESET DURING RESET PHASE
        } else {
            console.log('OAUR NAUR - NAUR QUESTIN AUR AURNSWER');
        }
    })
}


function answerEval(event) {
    // ONLY ON BTN CLICK
    if (event.target.tagName === 'BUTTON') {

        const clickedAnswer = parseInt(event.target.value)
        const AllAnswerBtns = document.querySelectorAll('.answerButton');
        // GET DB CURRENT ANSWER
        get(dbRef).then(function (snapshot) {


            if (snapshot.exists()) {
                const currentAnswerPath = snapshot.val().currentAnswer

                // comparing clicked btn value to DB currentanswer
                if (clickedAnswer === currentAnswerPath) {
                    AllAnswerBtns.forEach(function (answerBtn) {
                        answerBtn.setAttribute('disabled', '');
                    })
                    //CORRECT ANSWER
                    localScore++;
                    // display local score to
                    scoreDisplay.textContent = localScore;
                    // delay .5s and then get question
                    event.target.classList.add('correct');
                    setTimeout(getQuestion, 500);
                    //Delete CURRENT QUESTION DATA from Firebase to avoid duplicate 

                } else {
                    AllAnswerBtns.forEach(function (answerBtn) {
                        answerBtn.setAttribute('disabled', '');
                    })
                    //INCORRECT ANSWER
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

function appendHighScore() {
    // variable for query -> takes score ref and order BY point value
    let orderedFirebaseScores = query(scoreRef, orderByChild('points'), limitToFirst(5));

    get(orderedFirebaseScores).then(function (data) {
        if (data.exists()) {
            // store current data as a variable (score array w ALL obj -name and score)
            const highScoreData = data.val();
            console.log(highScoreData)
            // clearing the list to reappend
            highScoreDisplay.innerHTML = '';

            for (let player in highScoreData) {
                const DBUser = highScoreData[player].user;
                const DBPoints = highScoreData[player].points;
                const newli = document.createElement('li')
                newli.classList.add('highscore')
                newli.textContent = `${DBUser} --- ${DBPoints}`
                highScoreDisplay.appendChild(newli)
            }


            // creating element to store each value  in 
            // highScoreData.forEach(function (score) {

            //     newli.textContent = `${score.name} --- ${score.points}`
            //     highScoreDisplay.appendChild(newli)
            // })

        } else {
            console.log('sorry no data found')
        }
    })
}

function playTimer() {
    // JS timer 
    function countdown() {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft > 0) {
            setTimeout(countdown, 1000);
        }

        // STLYING FOR FINAL FIVE SECONDS -> Courtsey of Derek Ngan
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

            // WANTING OBJ W USER NAME AS A VALUE
            const userScore = { user: userName, points: localScore }

            //Upload to Firebase when the timer runs out 
            push(scoreRef, userScore)

            appendHighScore();

            yourLocalScore.textContent = `${userName}: ${localScore} points`

            changeState(playState, resetState);
        }
    };

    setTimeout(countdown, 1000);


    const bar = document.querySelector('#bar');
    let timeLimit = `${String(timeLeft)}s`;
    bar.style.animationDuration = timeLimit;
}

function changeState(hiddenState, activeState) {
    // when start button is pressed, start state is hidden and play state appears
    hiddenState.classList.add('hidden');
    activeState.classList.remove('hidden');
}


answerBox.addEventListener('click', answerEval)






// call this function when want new set of questions to load


// questionLoad();




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





// add a form + label + input to start state HTML
// change button eventlistener to formeventlistener


nameForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // console.log (nameInput.value)
    userName = nameInput.value
    // console.log(userName)

    // hiding start state and activating playstate
    changeState(startState, playState);

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
    //Reset the firebase questions 

    // localScore is reset to 0 
    localScore = 0;
    // time limit reset
    timeLeft = 500;
    userName = '';
})






