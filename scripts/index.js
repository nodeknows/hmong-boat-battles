// Belt Handler
var belt = document.querySelectorAll('.belt');

function getClone() {
    let i = document.createElement('img');
    i.setAttribute('src', "imgs/home-white.png");
    i.style.position = 'relative';
    return i;
};

for (let i = 0; i <= 90; i++) {
    let t = getClone(), b = getClone();
    t.setAttribute('class', "topHome");
    belt[0].appendChild(t);
    b.setAttribute('class', "bottomHome");
    belt[1].appendChild(b);
};

// Plz don't leave
// window.onbeforeunload = function (e) {
//     return 'Are you sure you want to leave? You are in the middle of something.';
// };

// Play Intro Handler
const delay = ms => new Promise(res => setTimeout(res, ms));

var characterSelection = document.getElementById('chooseCharacter');
let intro = document.getElementById('intro');
let form = document.querySelector('#intro form');
let play = document.querySelector('#intro button');
let h1sec = document.querySelector('#intro section');
let h1s = document.querySelectorAll('#intro h1');

const swooshAway = async (elem, del) => {
    await delay(del);
    elem.animate(
        [{ opacity: 0 }],
        { duration: 250, fill: 'forwards' }
    );
};

let debounce = false;

play.addEventListener("click", async function (event) {
    event.preventDefault();

    if (debounce) return;

    debounce = true;

    swooshAway(h1s[0], 0);
    swooshAway(h1s[1], 250);
    swooshAway(h1s[2], 500);

    await delay(1250);
    h1sec.remove();

    form.style.position = 'absolute';

    play.innerHTML = '';
    play.style.transition = "all 1s";
    play.style.zIndex = 5;
    play.style.filter = "none";
    play.style.top = "50%";
    play.style.width = '100%';
    play.style.borderRadius = 0;

    await delay(1000);
    play.style.height = '100vh';
    await delay(1000);
    play.style.height = '0vh';
    characterSelection.style.visibility = "visible";
    await delay(1000);
    play.style.width = 0;
    await delay(500);
    play.style.opacity = 0;
    await delay(1000);
    intro.remove();
});

// characterSelection 
let playerSelectingChar = 1;

var playerCharacters = [];

const chooseCharSec = document.getElementById('chooseCharacter');
const shaman = document.querySelector('#shaman');
const riceFarmer = document.querySelector('#riceFarmer');

shaman.onclick = function() { selectCharacter('shaman') }
riceFarmer.onclick = function() { selectCharacter('riceFarmer') }

function selectCharacter(char) {
    playerCharacters[playerSelectingChar] = char;
    if (playerSelectingChar === 2) {
        transitionToGame();
        consoleOutput(`P2 CHOSE "${playerCharacters[2].toUpperCase()}." CHOOSE YOUR BOATS!`)
    } else {
        playerSelectingChar = 2;
        outputChar(`P1 CHOSE "${playerCharacters[1].toUpperCase()}." P2 CHOOSE YOUR CHARACTER`)
    }
    
}

async function transitionToGame() {
    const game = document.getElementById('game')
    const imgs = document.querySelectorAll('#frame img');
    const frame = document.querySelector('#frame');
    const h2 = document.querySelectorAll('#frame div h2');
    const ul = document.querySelectorAll('#frame div ul');
    const h3 = document.querySelector('h3');
    const shaman = document.getElementById('shaman');
    const riceFarmer = document.getElementById('riceFarmer');

    h3.innerHTML = '';

    for (let i = 0; i <=1; i++) {
        imgs[i].style.opacity = 0;
        h2[i].style.opacity = 0;
        ul[i].style.opacity = 0;
    }
    
    await delay(1000)
    
    imgs[0].remove()
    imgs[1].remove()

    h2[0].remove()
    h2[1].remove()

    ul[0].remove()
    ul[1].remove()
    
    frame.style.width = '0px'
    frame.style.height = '50px'

    await delay(1000)

    shaman.remove();
    riceFarmer.remove()
    
    frame.style.backgroundColor = 'white'
    frame.style.maxHeight = 'none'
    frame.style.maxWidth = 'none'
    
    frame.style.width = '100vw'

    await delay(1000)

    frame.style.height = '100vh'

    await delay(1000)
    
    game.style.visibility = "visible"
    frame.style.height = '5vh'

    await delay(1000)

    frame.style.width = '0'
    frame.style.opacity = 0

    await delay(1000)

    chooseCharSec.remove()
}

function outputChar(msg) {
    const consoleElem = document.querySelector('#consoleFrame > h3');
    consoleElem.innerHTML = msg;
}

// Clone Rows until 8 (72 total squares)
const topSec = document.getElementById('topSec');
const rowA = document.querySelector('#A');

const rowsIndex = {
    "A": rowA,
    "B": null,
    "C": null,
    "D": null,
    "E": null,
    "F": null,
    "G": null,
    "H": null,
};

const sqIndex = {} // sqIndex.A5, sqIndex.H7 -> Element Node

for (let r in rowsIndex) { // Create the remaining required alphabetical rows, B-H
    if (!document.querySelector(`#${r}`)) {
        const clonedR = rowA.cloneNode(true);
        clonedR.id = r;

        topSec.appendChild(clonedR);
        rowsIndex[r] = clonedR;
    };
};


for (let r in rowsIndex) { // Assign each square a unique ID, A5, A8, D3, etc.. THEY ARE ALREADY PREWRITTEN WITH A NUMERICAL VALUE THO!
    let rElem = rowsIndex[r]
    for (let sq of rElem.childNodes) {
        sq.id = r + sq.id
    }
}

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

for (let alpha of alphabet) { // Create sqIndex variable
    let row = rowsIndex[alpha];
    let squares = row.children;
    for (let square of squares) {
        sqIndex[square.id] = square;
    }
}

// Game Essential Funcs
const gameConsole = document.getElementById('gameConsole');
function consoleOutput(msg) {
    gameConsole.innerHTML = msg;
};

// Game Handler
let playerIdTurn = 1; // 1 = player 1, 2 = player 2
let gameStage = 1; // 1 = selecting boats, 2 = destroying boats, 3 = victory screen

consoleOutput('P1 TURN: 1x Fishing (4 Space), 2x Bamboo (3 Space), 3x Basket (1 Space) Boats Left');

let boatSelected = null; // == & === null is true
let sqsSelected = []

function checkSqs(sqs) { // check if they are aligned and by how much
    let Cols = [];
    let Rows = [];

    for (let sqIndex in sqs) {
        let sq = sqs[sqIndex];
        let sqRow = sq.slice(0, 1);
        let sqCol = sq.slice(1, 2);

        Rows.push(sqRow);
        Cols.push(sqCol);
    }

    Rows.sort() // Sort the Rows array alphabetically

    function letterToNumber(letter) { // @ CHATGPT
        letter = letter.toUpperCase();
        return letter.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
    }

    for (let rowIndex in Rows) { // Transform A-Z to 1-26 (letters to numbers)
        let letter = Rows[rowIndex];
        Rows[rowIndex] = letterToNumber(letter)
    };

    const allEqual = arr => arr.every(val => val === arr[0]); // @ https://dev.to/rajnishkatharotiya/function-to-check-if-all-records-are-equal-in-array-javascript-3mo3

    // if letters are in order
    function isConsecutive(arr) {
        for (let i in arr) {
            i = parseInt(i)
            if (i + 1 != arr.length) {
                if (Math.abs(arr[i] - arr[i + 1]) > 1) return false;
            }
        }
        return true;
    }

    // If the positions are aligned in rows (Numbers in order, Letters are same)
    // If the positions are algined in columns (Numbers are same, Letters are in order)
    if ((isConsecutive(Cols) && allEqual(Rows)) || (isConsecutive(Rows) && allEqual(Cols))) return true;

    return false;
}

// Boat Selection (Visual) Handler
const basket = document.getElementById('basket');
const bamboo = document.getElementById('bamboo');
const fishing = document.getElementById('fishing');

let selectedBoat = null;
let maxBoatSq = 0;

function selectBoat(boatType) {
    const boatElem = document.getElementById(boatType);

    // if there was a previously selected boat, deselect it.
    if (selectedBoat) {
        const oldBoatElem = document.getElementById(selectedBoat);
        oldBoatElem.style.border = 'none'
    }

    // if boat clicked is already selected, deselect it.
    if (selectedBoat === boatType) {
        selectedBoat = null;
        boatElem.style.border = 'none';
        return;
    }

    selectedBoat = boatType;

    boatElem.style.border = '3px solid white'

    switch (boatType) {
        case 'basket':
            maxBoatSq = 1;
            break;
        case 'bamboo':
            maxBoatSq = 3;
            break;
        case 'fishing':
            maxBoatSq = 4;
            break;
    }

    initSqSelect();
}

basket.onclick = function () { selectBoat('basket') };
bamboo.onclick = function () { selectBoat('bamboo') };
fishing.onclick = function () { selectBoat('fishing') };

// Square Selection

// FOR-LOOPS ARRAYS NOTE:
// in | returns index
// of | returns item