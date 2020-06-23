function gameRoutes(app) {
    let goodAnswers = 0;
    let isGameOver = false
    let callToAFriendUsed = false;
    let questionToTheCrowd = false;
    let halfOnHalf = false;
    // -------------------------
    const questions = [
        {
            question: "Płyta indykcyjna charakteryzuje się",
            answers: [
                'Po wyłaczeniu zasilania miejsce grzewcze jest chłodne',
                "Jest o 50% grubsza od standardowej, indykcyjnej płyty",
                "Nie jest zasilana prądem elektrycznym",
                "Można ją podłączyć bezprzewodowo"],
            correctAnswers: 0,
            imgSource: "/images/płyta-indukcyjna.jpg"

        },
        {
            question: "Co to jest obłóg?",
            answers: [

                "Płat drewna o minimalnej grubości 8mm",
                'Cienki płat drewna używany do produkji płyt stolarkich',
                "Nie jest to na pewno fornir",
                "Taka kora drewna tylko innaczej nazwana"],
            correctAnswers: 1

        },
        {
            question: "Jaką wysokość standardowo ma lodówka do zabudowy:",
            answers: ['133cm', "190cm", "187cm", "178cm"],
            correctAnswers: 3


        },
        {
            question: "Gdzie standardowo umieszczamy gniazdo elektryczne dla chłodziarki",
            answers: ['W korpusie szafki nad chłodziarką.', "Pod korpusem chłodziarki, na wysokości cokołu", "Tak jak mówi specyfikacja techniczna", "Byle gdzie, ważne żeby było", " po drugiej stronie na ścianie "],
            correctAnswers: 2
        },
        {
            question: "Co jest nie tak  na tym  poziomym przekroju drzwi",
            answers: ['Opaska nie jest umiejscowiona w jednej lini z opaską po drugiej stronie', "Skrzydło drzwi jest cofnięte w stosunku do lica ościeżnicy.", "Ościeżnica drzwi jest za krótka w stosunku do szerokości muru", "Brak odpowiedzniej grubości ościeżnicy na zawias wewnętrzny."],
            correctAnswers: 1,
            imgSource: "/images/drzwi-przekrój.png"
        },
        {
            question: "Upożądkuj w odpowiedniej kolejności proces malowania bejcą: ",
            answers: ['bejcowanie, lakier, lakier', "lakier, bejcowanie ,lakier", "lakier, bejcowanie", "lakierowanie, bejcowanie, utwardzanie"],
            correctAnswers: 0
        },
        {
            question: `Gdzie występuje szerszy kąt otwarcia`,
            answers: ["We froncie z zawiasem puszkowym i ślepym zawiasem motylkowym", 'We froncie z zawiasem motylkowym', "We froncie z zawiasem puszkowym", "3We froncie z zawiasem wewnętrznym np Kubica"],
            correctAnswers: 1
        },
        {
            question: `Co pokazane jest na zdjęciu?`,
            answers: ["Klamki i szyldy na patent", 'Biały obrus z lnu', "Szyldy dla drzwi do wykorzystania z  patentem ", "Klamka i szyldy na zamek na klucz"],
            correctAnswers: 3,
            imgSource: "/images/zamek-na-klucz.jpg"
        

        },
        {
            question: `Czy można zastosować podwieszany zlewozmywak w drenianym blacie`,
            answers: ["tak", 'nie', "tylko jak się go przyklei ", "tak, ale musi być specjalnie wyprofilowany"],
            correctAnswers: 1,

        },
        {
            question: `Gdzie we frontach nie występują spowalniacze`,
            answers: ["We frontach z ramką okalającą", 'we fronach z zawiasami puszkowymi', "Tam, gdzie występują zawiasy motylkowe", "We frontach z zawiasami puszkowymi i zawiasami motylkowymi imitujące główne zawiasy. "],
            correctAnswers: 2,

        },
        {
            question: `Jak regulujemy ogranicznik otwarcia we froncie?`,
            answers: ["Poprzez regulację sprężyny", "Za pomocą śrubokręta", "Poprzez wykręcenie dodatkowych śrubek ograniczających", "za pomocą klucza sześciokątnego"],
            correctAnswers: 3,
            imgSource: "/images/ogranicznik-otwarcia.jpg"
            
            

        },
        {
            question: `O czym należy przede wszystkim pamiętać zamawiając zlew ceramiczny?`,
            answers: ["O wybiciu otworu na baterię", "O podbiciu gwarancji", "O kupieniu susharki.", "O kupieniu odpowiednich środków zabezpieczających powierzchnię zlewozmywaka" ],
            correctAnswers: 0,
            imgSource: "/images/zlew-ceramiczny.jpg"

        
        },
        {
            question: `Jaką szerokość ma wkładka/panent do drzwi?`,
            answers: ["6cm","7cm","8cm","9cm" ],
            correctAnswers: 2,
        },
        
    ]
    const wylosowaneIndexy = [

    ]

    // --------------------------------

    function losujIndex() {
        let questionsLength = questions.length
        const indexLottery = Math.floor(Math.random() * questionsLength)
        return indexLottery
    }







    app.get('/question', (req, res) => {
        wylosowanyindex = losujIndex()
        console.log("Wylosowany index: "+ wylosowanyindex)
        
        // if (wylosowaneIndexy.indexOf(wylosowanyindex)===-1) {
        //     console.log(`${wylosowanyindex}jeszcze nie był`)
        //     function addIndexToArray() {
        //         wylosowaneIndexy.push(wylosowanyindex)
        //         console.log(wylosowaneIndexy)
        //     }
        // }
// ________________________

        if (wylosowaneIndexy.indexOf(wylosowanyindex) === -1) {
            console.log(`${wylosowanyindex} jeszcze nie był`)
            addIndexToArray = () => {
                wylosowaneIndexy.push(wylosowanyindex)
                console.log(wylosowaneIndexy)
            }
          
        } else{
            console.log('ten index już był!')
            wylosowanyindex = losujIndex()
            if (wylosowaneIndexy.indexOf(wylosowanyindex) === -1) {
                console.log(`${wylosowanyindex} jeszcze nie był`)
                addIndexToArray = () => {
                    wylosowaneIndexy.push(wylosowanyindex)
                    console.log(wylosowaneIndexy)
                }
        }
        else{
                console.log('ten index już był!')
                wylosowanyindex = losujIndex()
        }
    }

// _______________________







        if(wylosowaneIndexy.length===questions.length){
            res.json({
                loser:true
            })
        }

        if (goodAnswers === 5) {
            res.json({
                winner: true
            })
        }


        if (goodAnswers === questions.length) {
            res.json({
                winner: true
            })
        } else if (isGameOver) {
            res.json({
                loser: true,
            })


        } else {

            addIndexToArray();

            const questionsLength = questions.length
            const nextQuestion = questions[wylosowanyindex]
            // console.log(indexLottery)
            const { question, answers, imgSource } = nextQuestion
            res.json({
                question, answers, imgSource, questionsLength
            })
        }

    })

    // ------------------------------------VVVVVVVVVVVVVVVVVVV


    app.post('/answer/:index', (req, res) => {

        if (isGameOver) {
            res.json({
                loser: true
            })
        }

        const { index } = req.params

        const question = questions[wylosowanyindex]

        const isGoodAnswer = question.correctAnswers === Number(index)
        const questionsLength = questions.length


        if (isGoodAnswer) {
            goodAnswers++
            losujIndex(wylosowanyindex)


        } else {
            isGameOver = true
        }
        res.json({
            // correct: isGoodAnswer,
            goodAnswers,
            questionsLength
            


        })
    })

    // ------------------------------------AAAAAAAAAAAAAAAAAAA
    // ------------------------------------VVVVVVVVVVVVVVVVVVV


    app.get('/help/friend', (req, res) => {
        if (callToAFriendUsed) {
            return res.json({
                text: "To koło ratunkowe już jest wykorzystane"
            })
        }
        callToAFriendUsed = true
        const doesFriendKnowAnswer = Math.random() < 0.
        const question = questions[wylosowanyindex]
        // console.log(question.correctAnswers)
        res.json({
            text: doesFriendKnowAnswer ? `hmm, wydaje mi się że jest to ${question.answers[question.correctAnswers]}` : "hmm, kurczę nie wiem"
        })

    })
    // ------------------------------------AAAAAAAAAAAAAAAAAAA
    // ------------------------------------VVVVVVVVVVVVVVVVVVV
    app.get('/help/half', (req, res) => {
        if (halfOnHalf) {
            return res.json({
                text: "Weź ...To koło ratunkowe już jest wykorzystane"
            })
        }
        halfOnHalf = true

        const question = questions[wylosowanyindex]
        const answersCopy = question.answers.filter((s, index) =>
            (
                index !== question.correctAnswers
            ))
        console.log(answersCopy)
        answersCopy.splice(~~Math.random() * answersCopy.length, 1)
        console.log(answersCopy)
        // const tablica=[1,2,3,4,,6]
        // const tablicaLenght=tablica.length
        // console.log(tablicaLenght)
        // const nowaTablica=tablica.splice(1,4)
        // console.log(nowaTablica)
        res.json({
            answersToRemove: answersCopy
        })

    })


    // ------------------------------------AAAAAAAAAAAAAAAAAAA
    // ------------------------------------VVVVVVVVVVVVVVVVVVV
    app.get('/help/crowdquestion', (req, res) => {
        if (questionToTheCrowd) {
            return res.json({
                text: "Weź .......To  jest wykorzystane"
            })
        }
        questionToTheCrowd = true

        const chart = [10, 20, 30, 40]
        for (let i = chart.length - 1; i > 0; i--) {
            const change = Math.floor(Math.random() * 20 - 10)

            chart[i] -= change
            chart[i - 1] += change
        }

        const question = questions[wylosowanyindex]
        const { correctAnswers } = question

        [chart[3], chart[1]] = [chart[1], chart[3]];

        res.json({
            chart
        })


    })
    // ------------------------------------AAAAAAAAAAAAAAAAAAA






}





module.exports = gameRoutes
