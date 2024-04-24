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

shaman.onclick = function () { selectCharacter('shaman') }
riceFarmer.onclick = function () { selectCharacter('riceFarmer') }

function selectCharacter(char) {
    playerCharacters[playerSelectingChar] = char;
    if (playerSelectingChar === 2) {
        transitionToGame();
        consoleOutput(`P1 TURN: CHOOSE YOUR BOATS!`)
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

    for (let i = 0; i <= 1; i++) {
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

const sqIndex = {} // sqIndex.A5, sqIndex.H7 -> Element

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
async function consoleOutput(msg) {
    // let prevMsg = gameConsole.innerHTML;

    // if (msg === prevMsg) return;

    // prevMsg = [...prevMsg];
    
    // let ttc = 200;
    // let del = ttc/(msg.length+prevMsg.length);
    
    // for (let i = prevMsg.length-1; i>0; i--) {
    //     prevMsg.pop()
    //     gameConsole.innerHTML = prevMsg.join("");
    //     await delay(del)
    // }

    // let msgArr = [];
    // for (let i = 0; i<msg.length; i++) {
    //     msgArr.push(msg[i]);
    //     gameConsole.innerHTML = msgArr.join("");
    //     await delay(del)
    // }

    gameConsole.innerHTML = msg;
};

// Game Handler
let playerIdTurn = 1; // 1 = player 1, 2 = player 2
let gamePhase = 2; // 1 = choosing boats, 2 = attacking boats, 3 = victory

let boatSelected = null; // == & === null is true

function checkSqs(sqs) { // check if they are aligned and by how much
    sqs.sort()

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

    // If there is no more boats available
    if (getRemainingBoats(boatType) === 0) return;

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

    const plural = maxBoatSq > 1 ? 'SQUARES' : 'SQUARE';
    consoleOutput(`P${playerIdTurn} TURN: YOU HAVE SELECTED ${boatType} BOAT. (TAKES UP ${maxBoatSq} ${plural})`);

    resetSqSelect();
}

basket.onclick = function () { selectBoat('basket') };
bamboo.onclick = function () { selectBoat('bamboo') };
fishing.onclick = function () { selectBoat('fishing') };

const boatIndex = {
    'basket': basket,
    'bamboo': bamboo,
    'fishing': fishing
}

// Square Selection
let sqsSelected = []
let unchoosableSqs = []
let findSq = {}; 
let ongoingTurn = false;
let attackedSqs = {
    1: [],
    2: [],
};
// findSq.top,       findSq.left,    findSq.right,       findSq.bottom, 
// findSq.topRight, findSq.topLeft, findSq.bottomLeft, findSq.bottomRight

// BOATS ALLOWED PER PLAYER: basket (3), bamboo (2), fishing (1)

let boatPositions = {
    1: { // player
        'basket': [], // sqsList
        'bamboo': [],
        'fishing': [],
    },

    2: {
        'basket': [['A1'], ['A3'], ['A5']],
        'bamboo': [['C1', 'C2', 'C3'], ['E1', 'E2', 'E3']],
        'fishing': [['H1', 'H2', 'H3', 'H4']],
    }
}

let attackedPositions = {
    1: [],
    2: []
}

for (let alpha of alphabet) {
    for (let sq of rowsIndex[alpha].children) {
        sq.onclick = function () {
             sqSelect(sq.id);
        }
    }
}

async function sqSelect(sq) {
    if (gamePhase === 2 && ongoingTurn==false) {
        const attackedPlrPos = attackedPositions[playerIdTurn];
        if (attackedPlrPos.includes(sq)) return;
        
        ongoingTurn = true;
        
        attackedPlrPos.push(sq);

        if (isBoatHere(sq)) {
            sqIndex[sq].style.backgroundColor = 'red';
            consoleOutput(`P${playerIdTurn}: Nice attack! You got a boat!`)
        } else {
            sqIndex[sq].style.backgroundColor = 'grey';
            consoleOutput(`P${playerIdTurn}: You found NO boats here. :(`)
        }

        await delay(1000)

        playerIdTurn = playerIdTurn==1 ? 2 : 1;

        consoleOutput(`P${playerIdTurn}: Your turn! Attack as you please!`)

        ongoingTurn = false;
        
        return;
    }

    if ((selectedBoat == null) || (unchoosableSqs.includes(sq))) return;

    const isAlrSelected = sqAlrSelected(sq)
    if (isAlrSelected !== false) {
        sqsSelected.splice(isAlrSelected, 1)
        sqIndex[sq].style.backgroundColor = 'white'
        return;
    }

    if (sqsSelected.length >= maxBoatSq) return;


    sqsSelected.push(sq)

    sqIndex[sq].style.backgroundColor = 'red'

    if ((sqsSelected.length == maxBoatSq) && (checkSqs(sqsSelected))) { // ONCE THEY HAVE THEIR SQUARES CORRECTLY SELECTED
        console.log('SELECTED: ' + sqsSelected)

        let boatDirectory = boatPositions[playerIdTurn][selectedBoat];
        let maxAllowedBoat = 0;

        switch (selectedBoat) {
            case 'basket':
                maxAllowedBoat = 3;
                break;
            case 'bamboo':
                maxAllowedBoat = 2;
                break;
            case 'fishing':
                maxAllowedBoat = 1;
                break;
        };

        if (boatDirectory.length < 1) {
            boatDirectory.push([...sqsSelected]); // STUCK ON THIS PROBLEM FOR 2 DAYS! SHOUTOUT TO @ https://stackoverflow.com/questions/35737119/changing-single-object-in-js-array-changes-all-elements
        } else if ((boatDirectory.length < 2) && (maxAllowedBoat > 1)) {
            boatDirectory.push([...sqsSelected]);
        } else if ((boatDirectory.length < 3) && (maxAllowedBoat > 2)) {
            boatDirectory.push([...sqsSelected]);
        }

        resetSqSelect(boatDirectory)
    }
}

function isBoatHere(sq) {
    const playerToAttack = playerIdTurn===1 ? 2 : 1
    const boatPosDir = boatPositions[playerToAttack];
    for (const [key, value] of Object.entries(boatPosDir)) { // [key, value] of Object.entries(list)
        for (let sqArr of value) {
            for (let sqOfArr of sqArr) {
                if (sqOfArr===sq) return true;
            }
        }
    }
    return false
}

// // if there was a previously selected boat, deselect it.
// if (selectedBoat) {
//     const oldBoatElem = document.getElementById(selectedBoat);
//     oldBoatElem.style.border = 'none'
// }

// // if boat clicked is already selected, deselect it.
// if (selectedBoat === boatType) {
//     selectedBoat = null;
//     boatElem.style.border = 'none';
//     return;
// }

function sqAlrSelected(sq) {
    const found = sqsSelected.find((rSq) => rSq === sq)
    if (found) return sqsSelected.indexOf(found);
    return false;
}

function resetSqSelect(boatDirectory) {
    for (sq of sqsSelected) {
        sq = sqIndex[sq].style.backgroundColor = 'white';
    }
    
    sqsSelected = [];

    if (boatDirectory) {
        for (let sqsList of boatDirectory) {
            for (let sq of sqsList) {
                sqIndex[sq].style.background = 'green'

                unchoosableSqs.push(findSq.top(sq))
                unchoosableSqs.push(findSq.topRight(sq))
                unchoosableSqs.push(findSq.right(sq))
                unchoosableSqs.push(findSq.bottomRight(sq))
                unchoosableSqs.push(findSq.bottom(sq))
                unchoosableSqs.push(findSq.bottomLeft(sq))
                unchoosableSqs.push(findSq.left(sq))
                unchoosableSqs.push(findSq.topLeft(sq))
            }
        }

        let maxBoats = getMaxBoats(selectedBoat);

        boatIndex[selectedBoat].style.border = 'none'
        consoleOutput(`P${playerIdTurn} TURN: YOU HAVE PLACED ${selectedBoat} (${boatDirectory.length}/${maxBoats}) BOAT. CHOOSE YOUR NEXT BOAT!`);
        selectedBoat = null;
    }   

    // When player is done selecting ALL boats
    if ((getRemainingBoats('basket') === 0) && (getRemainingBoats('bamboo') === 0) && (getRemainingBoats('fishing') === 0)) {
        unchoosableSqs = [];
        clearBoatSelection()

        if (playerIdTurn === 1) {
            playerIdTurn = 2;
            consoleOutput(`P${playerIdTurn} TURN: YOU'RE NEXT! CHOOSE YOUR BOATS.`)
        } else {
            let barId;
            let charName;

            if (playerCharacters[playerIdTurn] === 'shaman') {
                barId = 'shamanPowerBar';
                charName = 'Shaman'
            } else {
                barId = 'riceFarmerPowerBar';
                charName = 'Rice Farmer'
            }

            consoleOutput(`P1 TURN: Go attack! Your character is ${charName}.`)

            const boatSelection = document.getElementById('boatSelection');

            boatSelection.remove();

            gamePhase = 2;

            switchToCharBar(barId);
        }
     }
}

function switchToCharBar(targetBarId) {
    let otherCharBarId = (targetBarId==='shamanPowerBar') ? "riceFarmerPowerBar" : "shamanPowerBar";
    let otherCharBar = document.getElementById(otherCharBarId)

    let targetBar = document.getElementById(targetBarId);

    otherCharBar.style.visibility = 'hidden';
    otherCharBar.style.display = 'none';

    targetBar.style.visibility = 'visible';
    targetBar.style.display = 'block';
}

function clearBoatSelection() {
    for (const [key, value] of Object.entries(sqIndex)) { // [key, value] of Object.entries(list)
        value.style.background = 'white';
    };
}

function getMaxBoats(boatType) {
    let maxAllowedBoat;
    switch (boatType) {
        case 'basket':
            maxAllowedBoat = 3;
            break;
        case 'bamboo':
            maxAllowedBoat = 2;
            break;
        case 'fishing':
            maxAllowedBoat = 1;
            break;
    };
    return maxAllowedBoat;
}

function getRemainingBoats(boatType) {
    let maxAllowedBoat = getMaxBoats(boatType);
    return boatPositions[playerIdTurn][boatType].length-maxAllowedBoat;
}

// findSq.top,       findSq.left,    findSq.right,       findSq.bottom, 
// findSq.topRight, findSq.topLeft, findSq.bottomLeft, findSq.bottomRight

// const alphabet

function alphaFind(letter, offset) { // returns the letter based off offset. (e.g letter = 'B', offset = 1, returns C)
    const nextAlpha = alphabet[alphabet.indexOf(letter)+offset]
    if (!nextAlpha) return letter
    return nextAlpha;
}

function numberFind(number, offset) {
    const nextNumber = parseInt(number)+offset;
    if ((nextNumber > 9) || (nextNumber < 1)) return number;
    return nextNumber;
}

findSq.top = function (sq) {
    return alphaFind(sq[0], -1) + sq[1]
}

findSq.bottom = function (sq) {
    return alphaFind(sq[0], 1) + sq[1]
}

findSq.left = function (sq) {
    return sq[0] + numberFind(sq[1], -1)
}

findSq.right = function (sq) {
    return sq[0] + numberFind(sq[1], 1)
}

//

findSq.topRight = function (sq) {
    return alphaFind(sq[0], -1) + numberFind(sq[1], 1)
}

findSq.topLeft = function (sq) {
    return alphaFind(sq[0], -1) + numberFind(sq[1], -1)
}

findSq.bottomLeft = function (sq) {
    return alphaFind(sq[0], 1) + numberFind(sq[1], -1)
}

findSq.bottomRight = function (sq) {
    return alphaFind(sq[0], 1) + numberFind(sq[1], 1)
}

// FOR-LOOPS ARRAYS NOTE:
// in | returns index
// of | returns item

// FOR-LOOPS LIST NOTE:
// [key, value] of Object.entries(list)