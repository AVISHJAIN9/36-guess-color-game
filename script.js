// --- DOM Elements ---
const wordDisplay = document.getElementById('color-word');
const scoreSpan = document.getElementById('score');
const timeSpan = document.getElementById('time');
const startBtn = document.getElementById('start-btn');
const matchBtn = document.getElementById('match-btn');
const mismatchBtn = document.getElementById('mismatch-btn');
const messageDiv = document.getElementById('message');

// --- Game State ---
const COLORS = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE'];
const INITIAL_TIME = 30;

let score = 0;
let timeRemaining = INITIAL_TIME;
let isMatch = false; // The current correct answer (true/false)
let timer;

// --- Utility Functions ---

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function updateScore(points) {
    score += points;
    scoreSpan.textContent = score;
}

function generateNewWord() {
    // 1. Determine if the next round should be a match or mismatch (50/50)
    isMatch = Math.random() < 0.5; 

    // 2. Select the WORD to display
    const word = getRandom(COLORS);

    // 3. Select the COLOR to display
    let color;
    if (isMatch) {
        // If match, color is the same as the word
        color = word;
    } else {
        // If mismatch, loop until we get a different color
        do {
            color = getRandom(COLORS);
        } while (color === word);
    }

    // 4. Update the display
    wordDisplay.textContent = word;
    wordDisplay.style.color = color;
}

function checkAnswer(userClickedMatch) {
    if (userClickedMatch === isMatch) {
        updateScore(1);
        messageDiv.textContent = "Correct!";
    } else {
        updateScore(-1); // Penalize for wrong answer
        messageDiv.textContent = "Wrong!";
    }
    // Generate next combination immediately
    generateNewWord();
}

function startGame() {
    // Reset state
    score = 0;
    timeRemaining = INITIAL_TIME;
    scoreSpan.textContent = score;
    timeSpan.textContent = timeRemaining;
    messageDiv.textContent = "";

    // Enable/Disable buttons
    startBtn.disabled = true;
    matchBtn.disabled = false;
    mismatchBtn.disabled = false;

    // Start timer
    timer = setInterval(() => {
        timeRemaining--;
        timeSpan.textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);

    // Start first word display
    generateNewWord();
}

function endGame() {
    matchBtn.disabled = true;
    mismatchBtn.disabled = true;
    startBtn.disabled = false;
    wordDisplay.textContent = "TIME UP!";
    wordDisplay.style.color = "white";
    messageDiv.textContent = `Game Over! Final Score: ${score}`;
}

// --- Event Listeners ---
startBtn.addEventListener('click', startGame);
matchBtn.addEventListener('click', () => checkAnswer(true));
mismatchBtn.addEventListener('click', () => checkAnswer(false));