const startButton = document.getElementById("startButton");
const welcomeScreen = document.querySelector(".welcome");
const pinScreen = document.getElementById("pinScreen");

const keys = document.querySelectorAll("[data-number]");
const pinDots = document.querySelectorAll(".pin-dot");

const clearPin = document.getElementById("clearPin");
const deletePin = document.getElementById("deletePin");
const backButton = document.getElementById("backButton");

const pinError = document.getElementById("pinError");
const pinCard = document.querySelector(".pin-card");

const correctPin = "0327";

let enteredPin = "";


/* OPEN PIN SCREEN */
startButton.addEventListener("click", () => {

    welcomeScreen.style.display = "none";
    pinScreen.classList.add("active");

});


/* NUMBER BUTTONS */

keys.forEach((key) => {

    key.addEventListener("click", () => {

        if (enteredPin.length >= 4) return;

        enteredPin += key.dataset.number;

        updatePinDisplay();

        if (enteredPin.length === 4) {

            setTimeout(checkPin, 250);

        }

    });

});


/* UPDATE DOTS */

function updatePinDisplay() {

    pinDots.forEach((dot, index) => {

        if (index < enteredPin.length) {

            dot.classList.add("filled");

        } else {

            dot.classList.remove("filled");

        }

    });

}


/* CHECK PIN */

function checkPin() {

    if (enteredPin === correctPin) {

        pinError.classList.remove("show");

        pinCard.classList.add("correct");

        setTimeout(() => {

    pinScreen.classList.remove("active");

    puzzleScreen.classList.add("active");

    resetPin();

    pinCard.classList.remove("correct");

}, 700);

    } else {

        pinError.classList.add("show");

        pinCard.classList.add("shake");

        setTimeout(() => {

            pinCard.classList.remove("shake");

            enteredPin = "";

            updatePinDisplay();

        }, 450);

    }

}


/* CLEAR */

clearPin.addEventListener("click", () => {

    enteredPin = "";

    pinError.classList.remove("show");

    updatePinDisplay();

});


/* DELETE ONE NUMBER */

deletePin.addEventListener("click", () => {

    enteredPin = enteredPin.slice(0, -1);

    pinError.classList.remove("show");

    updatePinDisplay();

});


/* GO BACK */

backButton.addEventListener("click", () => {

    pinScreen.classList.remove("active");

    resetPin();

});


/* RESET PIN */

function resetPin() {

    enteredPin = "";

    pinError.classList.remove("show");

    updatePinDisplay();

}/* ========================================
   PHOTO PUZZLE
======================================== */

const puzzleScreen = document.getElementById("puzzleScreen");
const puzzleBoard = document.getElementById("puzzleBoard");
const puzzleMessage = document.getElementById("puzzleMessage");
const continueButton = document.getElementById("continueButton");
const loveSite = document.getElementById("loveSite");
const puzzleSize = 4;
const totalPieces = puzzleSize * puzzleSize;

let puzzleOrder = [];
let selectedPiece = null;
let puzzleSolved = false;


/* CREATE PUZZLE */

function createPuzzle() {

    puzzleBoard.innerHTML = "";

    puzzleSolved = false;
    selectedPiece = null;

    puzzleMessage.textContent =
        "Some things are just meant to fit ♡";

    puzzleBoard.classList.remove("completed");
    continueButton.classList.remove("show");


    /* CREATE CORRECT ORDER */

    puzzleOrder = Array.from(
        { length: totalPieces },
        (_, index) => index
    );


    /* SHUFFLE */

    do {

        puzzleOrder.sort(() => Math.random() - 0.5);

    } while (isPuzzleSolved());


    /* BUILD PIECES */

    puzzleOrder.forEach((pieceNumber) => {

        const piece = document.createElement("div");

        piece.classList.add("puzzle-piece");
        piece.style.backgroundImage = 'url("IMAGES/puzzle-photo.jpeg")';

        piece.dataset.piece = pieceNumber;


        /* ORIGINAL PHOTO POSITION */

        const row = Math.floor(pieceNumber / puzzleSize);
        const column = pieceNumber % puzzleSize;

        const x = (column / (puzzleSize - 1)) * 100;
        const y = (row / (puzzleSize - 1)) * 100;

        piece.style.backgroundPosition =
            `${x}% ${y}%`;


        piece.addEventListener("click", () => {

            selectPuzzlePiece(piece);

        });


        puzzleBoard.appendChild(piece);

    });

}


/* SELECT TWO PIECES AND SWAP */

function selectPuzzlePiece(piece) {

    if (puzzleSolved) return;


    /* FIRST PIECE */

    if (!selectedPiece) {

        selectedPiece = piece;

        piece.classList.add("selected");

        return;

    }


    /* SAME PIECE AGAIN */

    if (selectedPiece === piece) {

        selectedPiece.classList.remove("selected");

        selectedPiece = null;

        return;

    }


    /* SECOND PIECE */

    const pieces =
        Array.from(puzzleBoard.children);

    const firstIndex =
        pieces.indexOf(selectedPiece);

    const secondIndex =
        pieces.indexOf(piece);


    /* SWAP */

    const temp =
        puzzleOrder[firstIndex];

    puzzleOrder[firstIndex] =
        puzzleOrder[secondIndex];

    puzzleOrder[secondIndex] =
        temp;


    selectedPiece.classList.remove("selected");

    selectedPiece = null;


    /* REDRAW */

    renderPuzzle();


    /* CHECK SOLUTION */

    if (isPuzzleSolved()) {

        completePuzzle();

    }

}


/* REDRAW PUZZLE */

function renderPuzzle() {

    puzzleBoard.innerHTML = "";

    puzzleOrder.forEach((pieceNumber) => {

        const piece =
            document.createElement("div");

        piece.classList.add("puzzle-piece");
piece.style.backgroundImage = 'url("IMAGES/puzzle-photo.jpeg")';
        piece.dataset.piece =
            pieceNumber;


        const row =
            Math.floor(pieceNumber / puzzleSize);

        const column =
            pieceNumber % puzzleSize;

        const x =
            (column / (puzzleSize - 1)) * 100;

        const y =
            (row / (puzzleSize - 1)) * 100;

        piece.style.backgroundPosition =
            `${x}% ${y}%`;


        piece.addEventListener("click", () => {

            selectPuzzlePiece(piece);

        });


        puzzleBoard.appendChild(piece);

    });

}


/* CHECK SOLUTION */

function isPuzzleSolved() {

    return puzzleOrder.every(
        (piece, index) => piece === index
    );

}


/* COMPLETED */

function completePuzzle() {

    puzzleSolved = true;

    puzzleBoard.classList.add("completed");

    puzzleMessage.textContent =
        "Perfect together ♡";

    continueButton.classList.add("show");

}


/* CREATE PUZZLE WHEN PAGE LOADS */

createPuzzle();

/* ========================================
   ENTER MAIN WEBSITE
======================================== */

continueButton.addEventListener("click", () => {

    puzzleScreen.classList.remove("active");

    loveSite.classList.add("active");

    loveSite.scrollTop = 0;

});

/* ========================================
   LIVE LOVE COUNTER
======================================== */

const daysTogether =
    document.getElementById("daysTogether");

const hoursTogether =
    document.getElementById("hoursTogether");

const minutesTogether =
    document.getElementById("minutesTogether");

const secondsTogether =
    document.getElementById("secondsTogether");


/* December 31, 2025 - 8:30 PM Eastern */

const storyStart =
    new Date("2025-12-31T20:30:00-05:00");


function updateLoveCounter() {

    const now = new Date();

    let difference =
        now - storyStart;

    if (difference < 0) {
        difference = 0;
    }


    const totalSeconds =
        Math.floor(difference / 1000);


    const days =
        Math.floor(totalSeconds / 86400);

    const hours =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;


    daysTogether.textContent =
        days;

    hoursTogether.textContent =
        String(hours).padStart(2, "0");

    minutesTogether.textContent =
        String(minutes).padStart(2, "0");

    secondsTogether.textContent =
        String(seconds).padStart(2, "0");

}


updateLoveCounter();

setInterval(updateLoveCounter, 1000);

/* ========================================
   DEVELOPMENT SHORTCUT
   REMOVE BEFORE PUBLISHING
======================================== */

document.addEventListener("keydown", (event) => {

    if (event.key.toLowerCase() === "d") {

        console.log("Developer shortcut activated");

        pinScreen.classList.remove("active");

        puzzleScreen.classList.add("active");

        puzzleOrder = Array.from(
            { length: totalPieces },
            (_, index) => index
        );

        renderPuzzle();

        completePuzzle();

    }

});

// =========================
// FALLING ROSE PETALS
// =========================

function createPetal() {
    const petal = document.createElement("div");

    petal.classList.add("petal");

    // Occasionally create a white petal
    if (Math.random() < 0.20) {
        petal.classList.add("white");
    }

    // Random horizontal starting point
    petal.style.left = Math.random() * 100 + "vw";

    // Random size
    petal.style.setProperty(
        "--size",
        8 + Math.random() * 10 + "px"
    );

    // Different falling speeds
    petal.style.setProperty(
        "--fall-duration",
        8 + Math.random() * 7 + "s"
    );

    // Different swaying speeds
    petal.style.setProperty(
        "--sway-duration",
        2.5 + Math.random() * 3 + "s"
    );

    // Different transparency
    petal.style.setProperty(
        "--opacity",
        0.35 + Math.random() * 0.4
    );

    document.body.appendChild(petal);

    // Remove it after it leaves the screen
    setTimeout(() => {
        petal.remove();
    }, 23000);
}

// Start with a few petals immediately
for (let i = 0; i < 6; i++) {
    setTimeout(createPetal, i * 300);
}

// Then keep petals falling
setInterval(createPetal, 0900);