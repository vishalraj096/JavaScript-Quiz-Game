const questions = [
    {
        'que': "What is the correct JavaScript syntax to write 'Hello World'?",
        'a': "System.out.println('Hello World')",
        'b': "printf('Hello World')",
        'c': "document.write('Hello World')",
        'd': "response.write(Hello World)",
        'correct': "c"
    }, {
        'que': "What is the correct way to write a JavaScript array?",
        'a': "const colors = 'red', 'green', 'blue'",
        'b': "const colors = 1:'red', 2:'green', 3:'blue'",
        'c': "const colors = { 'red', 'green', blue' }",
        'd': "const colors = ['red', 'green', 'blue']",
        'correct': "d"
    }, {
        'que': 'Which of the following is a markup language?',
        'a': "HTML",
        'b': "CSS",
        'c': "JavaScript",
        'd': "PHP",
        'correct': "a"
    }, {
        'que': "What year was JavaScript launched?",
        'a': "1996",
        'b': "1995",
        'c': "1994",
        'd': "none of the above",
        'correct': "b"
    }, {
        'que': "What does CSS stands for?",
        'a': "Hypertext Markup Language",
        'b': "Cascading Style Sheet",
        'c': "Jason Object Notation",
        'd': "Helicopters Terminals Motorboats Lamborginis",
        'correct': "b"
    }
]

let index = 0;
let total = questions.length;
let right = 0, wrong = 0;
const quesBox = document.getElementById("quesBox");
const optionInputs = document.querySelectorAll('.options');

const loadQuestion = () => {
    if (index === total) {
        return endQuiz();
    }
    reset();
    if (index == 0) {
        document.getElementById("buton").innerHTML = `<button class="btnq" id="subz" onclick="submitQuiz()">
        Next
    </button>`;
    } else {
        document.getElementById("buton").innerHTML = `<button class="btn2" onclick="prevQuiz()">
        Previous
    </button>
    <button class="btn2" id="subz" onclick="submitQuiz()">
        Next
    </button>`;
    }
    if (index == total - 1) {
        document.getElementById("buton").innerHTML = `<button class="btn2" onclick="prevQuiz()">
        Previous
    </button>
    <button class="btn2" id="subz" onclick="submitQuiz();  stopTimer()">
        SUBMIT
    </button>`;
    }
    const data = questions[index];
    quesBox.innerText = `${index + 1}) ${data.que}`;
    optionInputs[0].nextElementSibling.innerText = data.a;
    optionInputs[1].nextElementSibling.innerText = data.b;
    optionInputs[2].nextElementSibling.innerText = data.c;
    optionInputs[3].nextElementSibling.innerText = data.d;
}

const submitQuiz = () => {
    const data = questions[index];
    const ans = getAnswer();
    if (ans === data.correct) {
        right++;
    } else {
        wrong++;
    }
    index++;
    loadQuestion();
    return;
}

const prevQuiz = () => {
    index = index - 1;
    loadQuestion();
    return;
}

const getAnswer = () => {
    let answer;
    optionInputs.forEach(
        (input) => {
            if (input.checked) {
                answer = input.value;
            }
        }
    )
    return answer;
}

const reset = () => {
    optionInputs.forEach(
        (input) => {
            input.checked = false;
        }
    )
}

const endQuiz = () => {
    if (right == 0) {
        document.getElementById("box").innerHTML = `
    <div style="text-align:center; line-height: 1.7;">
    <h1>Thanks for playing.</h1>
    <h2> ${right}/${total} are correct.</h2>
    <p class="bmar">Better Luck Next Time!</p>
    <div class="fflex">
    <a class="btn2 bpad" href="index.html">
        Play Again
    </a>
    <a class="btn2 bpad" href="answers.html">
        Correct Answers
    </a></div></div>
    `;
    }
    else if (right == 5) {
        document.getElementById("box").innerHTML = `
    <div style="text-align:center; line-height: 1.7;">
    <h1>Thanks for playing.</h1>
    <h2> ${right}/${total} are correct.</h2>
    <p class="bmar">Great Job!</p>
    <div class="fflex">
    <a class="btn2 bpad" href="index.html">
        Play Again
    </a>
    <a class="btn2 bpad" href="answers.html">
    Correct Answers
    </a></div></div>
    `;
    }
    else {
        document.getElementById("box").innerHTML = `
    <div style="text-align:center; line-height: 1.7;">
    <h1>Thanks for playing.</h1>
    <h2> ${right}/${total} are correct.</h2>
    <p class="bmar">Not bad, but you could do better</p>
    <div class="fflex">
    <a class="btn2 bpad" href="index.html">
        Play Again
    </a>
    <a class="btn2 bpad" href="answers.html">
    Correct Answers
    </a></div></div>
    `;
    }
}

loadQuestion();

function updateTimer() {
    var currentTime = Date.now();
    var elapsedTime = currentTime - startTime;
    var minutes = Math.floor(elapsedTime / 60000);
    var seconds = Math.floor((elapsedTime % 60000) / 1000);
    var formattedTime = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    timerElement.textContent = formattedTime;
}

function stopTimer() {
    clearInterval(intervalId);
}

var startTime = Date.now();
var timerElement = document.getElementById('timer');
var intervalId;
document.getElementById('subz').addEventListener('click', stopTimer());
intervalId = setInterval(updateTimer, 1000);
