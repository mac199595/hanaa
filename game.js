// Game Settings
const maxQuestions = 10; // Number of questions
let timer;
let timeLeft = 60; // 1-minute timer
let currentQuestion = 0;
let score = 0;
let selectedOperation = null;

// Elements
const mainMenu = document.getElementById('main-menu');
const gameContainer = document.getElementById('game-container');
const questionDiv = document.querySelector('.question');
const choicesDiv = document.querySelector('.choices');
const timerSpan = document.getElementById('time');
const gameOverDiv = document.getElementById('game-over');
const gameWinDiv = document.getElementById('game-win');
const homeButton = document.getElementById('home-button');

// Start Game
function startGame(operation) {
    selectedOperation = operation;
    mainMenu.style.display = 'none';
    gameContainer.style.display = 'block';
    resetTimer();
    generateQuestion();
    startTimer();
}

// Generate a Random Question
function generateQuestion() {
    if (currentQuestion >= maxQuestions) {
        endGame();
        return;
    }

    currentQuestion++;
    let num1 = Math.floor(Math.random() * 20) + 1;
    let num2 = Math.floor(Math.random() * 20) + 1;

    let correctAnswer;

    switch (selectedOperation) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            correctAnswer = num1 - num2;
            break;
        case '*':
            correctAnswer = num1 * num2;
            break;
        case '/':
            // Ensure division without fractions
            while (num1 % num2 !== 0) {
                num1 = Math.floor(Math.random() * 20) + 1;
                num2 = Math.floor(Math.random() * 20) + 1;
            }
            correctAnswer = num1 / num2;
            break;
    }

    // Update Question Text
    questionDiv.textContent = `ما هو ناتج: ${num1} ${selectedOperation} ${num2}:`;

    // Generate Choices
    const choices = [
        correctAnswer,
        correctAnswer + Math.floor(Math.random() * 5) + 1,
        correctAnswer - Math.floor(Math.random() * 5) - 1,
        correctAnswer + Math.floor(Math.random() * 3) + 2
    ];
    choices.sort(() => Math.random() - 0.5);

    // Display Choices
    choicesDiv.innerHTML = '';
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.onclick = () => checkAnswer(choice, correctAnswer);
        choicesDiv.appendChild(button);
    });
}

// Check the Answer
function checkAnswer(selected, correct) {
    if (selected === correct) {
        score++;
        resetTimer();
        generateQuestion();
    } else {
        endGame(false);  // End the game if the answer is wrong
    }
}

// Timer Functionality
function startTimer() {
    timeLeft = 60; // Reset to 1 minute
    timer = setInterval(() => {
        timeLeft--;
        timerSpan.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame(false);  // End the game if the time runs out
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    startTimer();
}

// End the Game
function endGame(isWin = true) {
    clearInterval(timer);
    questionDiv.textContent = '';
    choicesDiv.innerHTML = '';
    
    // Display appropriate message based on win/lose
    if (isWin) {
        gameWinDiv.textContent = `مبروك! لقد أجبتم على ${score} من أصل ${maxQuestions} أسئلة بشكل صحيح!`;
        gameWinDiv.style.display = 'block';
        gameOverDiv.style.display = 'none';
        
        // Insert the winning image
        gameWinDiv.innerHTML += `<img src="https://i.postimg.cc/vHbH47VD/winning.jpg" alt="مبروك" style="width: 100px; height: auto;">`;
    } else {
        gameOverDiv.textContent = `للأسف! انتهت اللعبة. لقد أجبتم على ${score} من أصل ${maxQuestions} أسئلة.`;
        gameOverDiv.style.display = 'block';
        gameWinDiv.style.display = 'none';
        
        // Insert the losing image
        gameOverDiv.innerHTML += `<img src="https://i.postimg.cc/QCrNk1Y4/losing.jpg" alt="خسارة" style="width: 100px; height: auto;">`;
    }
    
    homeButton.style.display = 'block';
}

// Restart Game
homeButton.onclick = () => {
    currentQuestion = 0;
    score = 0;
    selectedOperation = null;
    gameOverDiv.textContent = '';
    gameWinDiv.textContent = '';
    gameOverDiv.style.display = 'none';
    gameWinDiv.style.display = 'none';
    homeButton.style.display = 'none';
    gameContainer.style.display = 'none';
    mainMenu.style.display = 'block';
};

// Initialize Game
