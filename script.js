const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const popup = document.getElementById("popup");
const resultText = document.getElementById("resultText");

const restartBtn = document.getElementById("restartBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

let currentPlayer = "X";
let gameActive = true;

let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);
playAgainBtn.addEventListener("click", restartGame);

function handleCellClick() {

    const index = this.dataset.index;

    if(board[index] !== "" || !gameActive){
        return;
    }

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkResult();
}

function checkResult(){

    let won = false;

    for(let pattern of winPatterns){

        const a = board[pattern[0]];
        const b = board[pattern[1]];
        const c = board[pattern[2]];

        if(a === "" || b === "" || c === ""){
            continue;
        }

        if(a === b && b === c){
            won = true;
            break;
        }
    }

    if(won){

        gameActive = false;

        resultText.textContent =
            `🎉 Player ${currentPlayer} Wins!`;

        popup.classList.remove("hidden");

        return;
    }

    if(!board.includes("")){

        gameActive = false;

        resultText.textContent =
            "🤝 It's a Draw!";

        popup.classList.remove("hidden");

        return;
    }

    currentPlayer =
        currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        `Player ${currentPlayer} Turn`;
}

function restartGame(){

    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    currentPlayer = "X";
    gameActive = true;

    statusText.textContent =
        "Player X Turn";

    cells.forEach(cell => {
        cell.textContent = "";
    });

    popup.classList.add("hidden");
}