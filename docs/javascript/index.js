// Create variables for the game state
let player1Score = 0;
let player2Score = 0;
let player1Turn = true;
let player1Rounds = 0;
let player2Rounds = 0;

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice");
const player2Dice = document.getElementById("player2Dice");
const player1Scoreboard = document.getElementById("player1Scoreboard");
const player2Scoreboard = document.getElementById("player2Scoreboard");
const message = document.getElementById("message");
const rollBtn = document.getElementById("rollBtn");
const resetBtn = document.getElementById("resetBtn");
const player1WonRounds = document.getElementById("player1Round");
const player2WonRounds = document.getElementById("player2Round");
const resetRounds = document.getElementById("resetRounds");

randomPlayer();
refreshRounds();
handleRounds();

/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    if (player1Turn) {
        player1Score += randomNumber;
        player1Scoreboard.textContent = player1Score;
        player1Dice.textContent = randomNumber;
        player1Dice.classList.remove("active");
        player2Dice.classList.add("active");
        message.textContent = "Player 2 Turn";
        
    } else {
        player2Score += randomNumber;
        player2Scoreboard.textContent = player2Score;
        player2Dice.textContent = randomNumber;
        player2Dice.classList.remove("active");
        player1Dice.classList.add("active");
        message.textContent = "Player 1 Turn";
        
    }
    
    if (player1Score >= 20) {
        message.textContent = "Player 1 Won 🥳";
        player1Rounds++
        localStorage.setItem('player 1', player1Rounds);
        showResetButton();
    }  else if (player2Score >= 20) {
        message.textContent = "Player 2 Won 🎉";
        player2Rounds++
        localStorage.setItem('player 2', player2Rounds);
        showResetButton();
    }
    handleRounds();
    player1Turn = !player1Turn;
})

function showResetButton() {
    rollBtn.style.display = "none";
    resetBtn.style.display = "block";
}

 
resetBtn.addEventListener("click", function(){
    reset();
})


function reset() {
    randomPlayer();
    player1Score = 0;
    player2Score = 0;
    player1Scoreboard.textContent = 0;
    player2Scoreboard.textContent = 0;
    player1Dice.textContent = "-";
    player2Dice.textContent = "-";
    resetBtn.style.display = "none";
    rollBtn.style.display = "block";
}

function randomPlayer() {
    const randomTurn = Math.floor(Math.random() * 2) + 1;
    

    if (randomTurn === 1) {
        player1Turn = true;
        message.textContent = "Player 1 Turn";
        player2Dice.classList.remove("active");
        player1Dice.classList.add("active");
    } else if (randomTurn === 2) {
        player1Turn = false;
        message.textContent = "Player 2 Turn";
        player1Dice.classList.remove("active");
        player2Dice.classList.add("active");
    }
}

function handleRounds() {
    player1WonRounds.textContent = localStorage.getItem('player 1') ? localStorage.getItem('player 1') : 0;
    player2WonRounds.textContent = localStorage.getItem('player 2') ? localStorage.getItem('player 2') : 0;
}

resetRounds.addEventListener('click', ()=>{
    refreshRounds();
    handleRounds();
});

function refreshRounds() {
    player2Rounds = 0;
    player1Rounds = 0;
    localStorage.setItem('player 1', player1Rounds);
    localStorage.setItem('player 2', player2Rounds);
}

