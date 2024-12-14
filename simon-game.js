const colors = ["green", "red", "yellow", "blue"];
let gameSequence = [];
let userSequence = [];
let level = 0;
let isGameActive = false;

// Start the game on key press
document.addEventListener("keydown", startGame);

// Start the game from level 1
function startGame() {
    if (!isGameActive) { // Prevent restarting during an active game
        resetGame();
        nextSequence();
    }
}

// Generate the next color in the sequence
function nextSequence() {
    userSequence = [];
    level++;
    document.getElementById("level-title").textContent = "Level " + level;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);

    // Animate the sequence
    gameSequence.forEach((color, index) => {
        setTimeout(() => {
            playSound(color);
            animateButton(color);
        }, 500 * index);
    });
}

// Handle button clicks
const buttons = document.querySelectorAll(".btn-simon");
buttons.forEach((button) => {
    button.addEventListener("click", function () {
        if (!isGameActive) return;

        const userColor = this.id;
        userSequence.push(userColor);
        playSound(userColor);
        animateButton(userColor);

        // Check the user's sequence
        checkAnswer(userSequence.length - 1);
    });
});

// Check if the user's input matches the game's sequence
function checkAnswer(currentLevel) {
    if (userSequence[currentLevel] === gameSequence[currentLevel]) {
        if (userSequence.length === gameSequence.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
}

// Play a sound for a given color
function playSound(color) {
    const audio = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${colors.indexOf(color) + 1}.mp3`);
    audio.play();
}

// Animate the button when pressed
function animateButton(color) {
    const button = document.getElementById(color);
    button.classList.add("btn-active");
    setTimeout(() => button.classList.remove("btn-active"), 300);
}

// Handle game over
function gameOver() {
    isGameActive = false;
    document.getElementById("level-title").textContent = "Game Over! Press any key to restart.";
    playSound("wrong");

    // Change background to red
    document.body.style.backgroundColor = "red";

    setTimeout(() => {
        document.body.style.backgroundColor = "";
    }, 1500);

    // Add event listener to restart game
    document.addEventListener("keydown", restartGame, { once: true }); // Use `{ once: true }` to ensure listener runs only once
}

// Restart the game from level 1
function restartGame() {
    resetGame();
    nextSequence();
}

// Reset game state
function resetGame() {
    level = 0;
    gameSequence = [];
    userSequence = [];
    isGameActive = true;
    document.getElementById("level-title").textContent = "Level " + level;
}
