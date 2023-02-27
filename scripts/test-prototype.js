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


// FUNCTIONS

// timer

let currentTime = 5;
function countDown() {
    let timer = setInterval(countDown, 1000)

    const timerElement = document.querySelector('#timer');
    timerElement.innerHTML = currentTime;
    currentTime--;

    timerElement.innerHTML = currentTime;

    if (currentTime <= 0) {
        clearInterval(timer)
        alert('bonk')
        let currentTime = 5;

    }
}

// function timer() {
//     setInterval(countDown, 1000)
// }

// random array value question
function randomArrVal(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length)

    return arr[randomIndex];
}

const questionDisplay = document.querySelector('#questionDisplay')

function questionLoad() {
    // randomly choose type of question 
    const currentQuestionType = randomArrVal(questionType);
    console.log(currentQuestionType);

    // randomly choosing a question form question types
    const currentQuestionObj = randomArrVal(currentQuestionType);
    // appending question.obj items to page

    // question update
    questionDisplay.textContent = currentQuestionObj.question;

    // dynamic answer update
    const currentAnswers = currentQuestionObj.answers
    const answerBox = document.querySelector('#answerBox')
    // clearing answers
    answerBox.innerHTML = '';


    currentAnswers.forEach(function (answer) {
        // console.log(currentAnswers.indexOf(answer)+1);
        const createDiv = document.createElement('div')
        createDiv.innerHTML = `
        <label for="btn${currentAnswers.indexOf(answer) + 1}">
            ${answer}
            <input type="radio" name="btn${currentAnswers.indexOf(answer) + 1}" id="btn${currentAnswers.indexOf(answer) + 1}" value="${currentAnswers.indexOf(answer) + 1}" class="answerInput">
        </label>`

        answerBox.appendChild(createDiv)
    })


    const currentCorrectAnswer = currentQuestionObj.correctAnswer
    function answerEval(event) {
        // Input event listener
        if (event.target.tagName === 'INPUT') {
            const userAnswer = parseInt(event.target.value)
            console.log(event.target);
            console.log(userAnswer)
            if (userAnswer === currentCorrectAnswer) {
                console.log('you are correct')
                setTimeout(questionLoad, 500);

            } else {
                console.log('you are WRONG')
                // questionLoad()
                setTimeout(questionLoad, 500);
            }
        }
    }

    answerBox.addEventListener('click', answerEval)
}
