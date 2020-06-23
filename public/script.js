const question = document.querySelector("#question")
const answer1 = document.querySelector("#answer1")
const answer2 = document.querySelector("#answe2")
const answer3 = document.querySelector("#answer3")
const answer4 = document.querySelector("#answer4")
const gameBoard = document.querySelector('#gameBoard')
const h2 = document.querySelector('h2')
const tipDiv = document.querySelector('#tip')
const help=document.querySelector(".help")
const body=document.querySelector('body')
const picturePlace = document.querySelector('picturepicture')
const h2imgPrice = document.querySelector('prize-img')



// --------------------------------------VVVVVVVVVVVVVVV
function fillQuestionElements(data) {
    if (data.winner === true) {
        gameBoard.style.display = 'none'
        help.style.display="none"

        const prize = document.createElement('div')
        prize.classList.add('prize');
        prize.innerHTML = `
        <h2>Brawo, otrzymujesz medal AKANU</h2>
        <img class="prize-img" src="./images/medal.jpg" alt="">
                `


       
        h2.appendChild(prize)

        // h2imgPrice.classList.add("imgPrize")
        
       


        
        console.log("już")
        return;
    }
    if (data.loser === true) {
        gameBoard.innerText="Przegrałeś, nie ma o czym gadać ... ."
    }
    if (data.imgSource) {
        gameBoard.classList.remove("fade")

        const div = document.createElement('div')
        div.classList.add('imagequestion');
        div.innerHTML = `
                  <img src=${data.imgSource} alt="">
                `
        const picturePlace = document.querySelector('.picturepicture')
        console.log(picturePlace)

        picturePlace.appendChild(div)

        question.innerText = data.question
        for (const i in data.answers) {

            const answerEl = document.querySelector(`#answer${Number(i) + 1} `)
            answerEl.innerText = data.answers[i]
            console.log("pytanko")
        }

    }
// ------dadaj element wyświetlający ilość pytań do narożnika
    const ecke = document.createElement('div')
    ecke.classList.add('questionNumberAll');
    ecke.innerHTML = `

                 <div> Baza ma ${data.questionsLength} pytań.</div>
                `
    

    body.appendChild(ecke)
    // ------

    gameBoard.classList.remove("fade")
    gameBoard.style.transform = "translateY(0px)"

    // imageSource = data.imgSource
    question.innerText = data.question
    for (const i in data.answers) {

        const answerEl = document.querySelector(`#answer${Number(i) + 1} `)
        answerEl.innerText = data.answers[i]
        console.log("pytanko")
    }


}


function showNextQuestion() {
    fetch('/question', {
        method: 'GET',
    })
        .then(r => r.json())
        .then(data => {
            fillQuestionElements(data)
            console.log(data)
        })
}

showNextQuestion();

// ------------------------------------AAAAAAAAAAAAAAAAAAA

// ------------------------------------VVVVVVVVVVVVVVVVVVV

const goodAnswersSpan = document.querySelector('#good-answers');
function handleAnswerFeedback(data) {
    gameBoard.classList.add("fade");
    gameBoard.style.transform="translateY(222px)"

    const picturePlace = document.querySelector('.picturepicture')

    picturePlace.innerHTML = ""



    goodAnswersSpan.innerText = `${data.goodAnswers}/5`
    setTimeout(() => {
        showNextQuestion()
    }, 400);

}

function sendAnswer(answerIndex) {
    fetch(`/answer/${answerIndex}`, {
        method: 'POST',
    })
        .then(r => r.json())
        .then(data => {
            handleAnswerFeedback(data)
        })
}

const buttons = document.querySelectorAll('.answer-btn')
console.log(buttons)
for (const button of buttons) {
    button.addEventListener('click', (event) => {
        const answerIndex = event.target.dataset.answer
        console.log("popo")
        sendAnswer(answerIndex)
        // console.log(answerIndex)
    })
}
// ------------------------------------AAAAAAAAAAAAAAAAAAA
function handleFriendAnswer(data) {
    tipDiv.innerText = data.text
}

function callToAFriend() {

    console.log('ddld')
    fetch('/help/friend', {
        method: 'GET',
    })
        .then(r => r.json())
        .then(data => {
            handleFriendAnswer(data)
        })
}
document.querySelector('#callToAFriend').addEventListener('click', callToAFriend)
// ------------------------------------AAAAAAAAAAAAAAAAAAA
// ------------------------------------VVVVVVVVVVVVVVVVVVV

function showHalf(data) {
    if (typeof data.text === 'string') {
        tipDiv.innerText = data.text
    } else {
        for (const button of buttons) {
            if (data.answersToRemove.indexOf(button.innerText) > -1) {
                button.innerText = '';
            }
        }
    }
}

function handleHalf() {

    fetch('/help/half', {
        method: 'GET',
    })
        .then(r => r.json())
        .then(data => {
            showHalf(data)
        })
}
document.querySelector('#halfOnHalf').addEventListener('click', handleHalf)
// ------------------------------------AAAAAAAAAAAAAAAAAAA
function handleCrowdAnswer(data) {
    if (typeof data.text === 'string') {
        tipDiv.innerText = data.text
    } else {

        data.chart.forEach((percent, index) => {
            buttons[index].innerText = `${buttons[index].innerText} --${percent} %`
            buttons[index].style.background =`rgba(12, 189, 12, 0.${percent}7)`
            console.log("opop")
        })
    }
}



function questionToTheCrowd() {
    console.log('opop')
    fetch('/help/crowdquestion', {
        method: 'GET',
    })
        .then(r => r.json())
        .then(data => {
            handleCrowdAnswer(data)

        })
}




document.querySelector("#questionToTheCrowd").addEventListener('click', questionToTheCrowd)


    // < !-- ----------------- color section-- >
  

