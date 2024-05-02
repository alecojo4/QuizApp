const questions = [
    {
        question: "Care este cel mai mare ocean din lume?",
        answers: [
            { text: "Oceanul Arctic", correct: false },
            { text: "Oceanul Pacific", correct: true },
            { text: "Oceanul Indian", correct: false },
            { text: "Oceanul Atlantic", correct: false }
        ]
    },
    {
        question: "Care este cel mai înalt munte din lume?",
        answers: [
            { text: "Mont Blanc", correct: false },
            { text: "Mount Everest", correct: true },
            { text: "K2", correct: false },
            { text: "Muntele Kilimanjaro", correct: false }
        ]
    },
    {
        question: "Care este cel mai lung fluviu din lume?",
        answers: [
            { text: "Nilul", correct: false },
            { text: "Amazonul", correct: true },
            { text: "Gange", correct: false },
            { text: "Yangtze", correct: false }
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex= 0;
let score =0;

function startQuiz(){
    currentQuestionIndex = 0;
    score =0;
    nextButton.innerHTML= "Next";
    showQuestion();
}
//afiseaza intrebarea curenta si butoanele pt.raspunsuri
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
//reseteaza elementele HTML la valorile implicite , ascunzand butonul Next si eliminand butoanele
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//apelata cand utilizatorul selecteaza un raspuns
//verifica daca raspunsul este corect sau nu
//
function selectAnswer(e){
    const selectedBtn= e.target;
    const isCorrect=selectedBtn.dataset.correct=== "true";
    if( isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML =  `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
   if(currentQuestionIndex< questions.length){
       handleNextButton();
   }
   else{
       startQuiz();
   }
});
startQuiz();