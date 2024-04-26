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

//debug
playerCharacters[2] = 'shaman';
playerCharacters[1] = 'riceFarmer'

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
let gamePhase = 1; // 1 = choosing boats, 2 = attacking boats, 3 = victory

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
let turnCount = 1;
let sqsSelected = []
let unchoosableSqs = []
let findSq = {};
let ongoingTurn = false;
let activePowerup = [];
let attackedSqs = {
    1: [],
    2: [],
};
// findSq.top,       findSq.left,    findSq.right,       findSq.bottom, 
// findSq.topRight, findSq.topLeft, findSq.bottomLeft, findSq.bottomRight

activePowerup[1] = null;
activePowerup[2] = null;

// BOATS ALLOWED PER PLAYER: basket (3), bamboo (2), fishing (1)

let boatPositions = {
    // 1: { // player
    //     'basket': [['A1'], ['A3'], ['A5']],
    //     'bamboo': [['C1', 'C2', 'C3'], ['E1', 'E2', 'E3']],
    //     'fishing': [['H1', 'H2', 'H3', 'H4']],
    // },

    // 2: {
    //     'basket': [['A1'], ['A3'], ['A5']],
    //     'bamboo': [['C1', 'C2', 'C3'], ['E1', 'E2', 'E3']],
    //     'fishing': [['H1', 'H2', 'H3', 'H4']],
    // },

    1: {
        'basket': [],
        'bamboo': [],
        'fishing': []
    },

    2: {
        'basket': [],
        'bamboo': [],
        'fishing': []
    }
}

let savedPlrPos = {
    1: [], // [sq, successful (boolean)]
    2: []
}

let powerupProperties = {
    'flying-strawhat': {
        toCooldown: 3,
        currentCooldown: 0,
    },

    'rice-blessing': {
        toCooldown: 4,
        currentCooldown: 0,
    },

    'spirit-bomb': {
        toCooldown: 4,
        currentCooldown: 0,
    },

    'jingle-bell': {
        toCooldown: 3,
        currentCooldown: 0,
    },
}

for (let alpha of alphabet) {
    for (let sq of rowsIndex[alpha].children) {
        sq.onclick = function () {
            sqSelect(sq.id);
        }
    }
}

let turnMultiplier = 0;

async function sqSelect(sq) {
    if (gamePhase === 2 && ongoingTurn == false) {

        const plrPos = savedPlrPos[playerIdTurn];
        let successfulAtt = false;
        let pwrUpProp = powerupProperties[activePowerup[playerIdTurn]];

        // check if that player already selected that square
        for (let sqTable of plrPos) {
            if (sqTable.includes(sq)) {
                return;
            }
        }

        ongoingTurn = true;

        if (activePowerup[playerIdTurn] === 'jingle-bell') {
            console.log('Jingle Bell ATT')
            let found = [
                isBoatHere(findSq.left(sq)),
                isBoatHere(findSq.top(sq)),
                isBoatHere(findSq.right(sq)),
                isBoatHere(findSq.bottom(sq)),
                isBoatHere(sq)
            ] //successfulAtt
            plrPos.push([findSq.left(sq), found[0]]);
            plrPos.push([findSq.top(sq), found[1]]);
            plrPos.push([findSq.right(sq), found[2]]);
            plrPos.push([findSq.bottom(sq), found[3]]);
            plrPos.push([sq, found[4]]);

            successfulAtt = (found[0] || found[1] || found[2] || found[3] || found[4])
            console.log(successfulAtt)
        } else if (activePowerup[playerIdTurn] === 'spirit-bomb') {
            if (turnMultiplier === 0) {
                turnMultiplier = 3;
            }
            let found = isBoatHere(sq)
            plrPos.push([sq, found]);
            successfulAtt = found;

            consoleOutput(`P${playerIdTurn} TURN: You have ${turnMultiplier} squares left to choose.`)

            if (successfulAtt) {
                console.log('Successful ATT');
                sqIndex[sq].style.backgroundColor = 'green';
                consoleOutput(`P${playerIdTurn} TURN: Nice attack! You got a boat!`)
                await delay(1000)
                if (hasPlayerWon(playerIdTurn)) {
                    gamePhase = 3;
                    const vicScreen = document.querySelector('#victoryScreen')
                    const pElem = document.querySelector('#victoryScreen p')
                    game.remove();
                    pElem.innerHTML = `Player ${playerIdTurn} won the game!`
                    vicScreen.style.visibility = 'visible'
                }
            } else {
                console.log('Failed ATT')
                sqIndex[sq].style.backgroundColor = 'grey';
                consoleOutput(`P${playerIdTurn} TURN: You found NO boats here. :(`)
                await delay(1000)
            }

            console.log('Turn: ' + turnCount)

            turnMultiplier--

            if (turnMultiplier === 0) {

                pwrUpProp.currentCooldown = pwrUpProp.toCooldown
                cooldownAttack(activePowerup[playerIdTurn], pwrUpProp.toCooldown)

                let newPlr = playerIdTurn == 1 ? 2 : 1;

                generateSqs(newPlr)

                playerIdTurn = newPlr
                charBarId = playerCharacters[playerIdTurn] == 'shaman' ? 'shamanPowerBar' : 'riceFarmerPowerBar'

                console.log(charBarId)

                switchToCharBar(charBarId)

                consoleOutput(`P${playerIdTurn} TURN: Your turn! Attack as you please!`)
            } else {
                consoleOutput(`P${playerIdTurn} TURN: You have ${turnMultiplier} squares left to choose.`)
            }

            ongoingTurn = false;

            return;
        } if (activePowerup[playerIdTurn] === 'flying-strawhat') {
            const randUnknownBoatSq = getUnknownBoatSq(playerIdTurn)

            sqIndex[randUnknownBoatSq].style.backgroundColor = 'green'

            successfulAtt = randUnknownBoatSq

            plrPos.push([successfulAtt, true]);

            pwrUpProp.currentCooldown = pwrUpProp.toCooldown

        } else {
            let found = isBoatHere(sq)
            plrPos.push([sq, found]);
            successfulAtt = found;
        }

        if (successfulAtt) {
            console.log('Successful ATT')

            if (activePowerup[playerIdTurn] === 'flying-strawhat') {
                cooldownAttack(activePowerup[playerIdTurn], pwrUpProp.toCooldown)
            } else {
                sqIndex[sq].style.backgroundColor = 'green';
            }

            if (activePowerup[playerIdTurn] === 'jingle-bell') {
                const left = findSq.left(sq);
                const right = findSq.right(sq);
                const top = findSq.top(sq);;
                const bottom = findSq.bottom(sq);

                sqIndex[left].style.backgroundColor = isBoatHere(left) ? 'green' : 'grey';

                sqIndex[right].style.backgroundColor = isBoatHere(right) ? 'green' : 'grey';

                sqIndex[top].style.backgroundColor = isBoatHere(top) ? 'green' : 'grey';

                sqIndex[bottom].style.backgroundColor = isBoatHere(bottom) ? 'green' : 'grey';

                pwrUpProp.currentCooldown = pwrUpProp.toCooldown
                cooldownAttack(activePowerup[playerIdTurn], pwrUpProp.toCooldown)
            }

            if (activePowerup[playerIdTurn] === 'rice-blessing') {
                pwrUpProp.currentCooldown = pwrUpProp.toCooldown
                cooldownAttack(activePowerup[playerIdTurn], pwrUpProp.toCooldown);
                let newPlr = playerIdTurn == 1 ? 2 : 1;
                let foundBoat = null;

                loop5: for (key in boatPositions[newPlr]) {
                    let bForBoat = boatPositions[newPlr][key]
                    for (let sqArr of bForBoat) {
                        for (let sqOfSqArr of sqArr) {
                            if (sqOfSqArr === sq) {
                                foundBoat = sqArr;
                                break loop5;
                            }
                        }
                    }
                }

                for (let sq of foundBoat) {
                    sqIndex[sq].style.backgroundColor = 'green';
                    plrPos.push([sq, true])
                }
            }

            consoleOutput(`P${playerIdTurn} TURN: Nice attack! You got a boat!`)

            await delay(1000)

            if (hasPlayerWon(playerIdTurn)) {
                gamePhase = 3;
                const vicScreen = document.querySelector('#victoryScreen')
                const pElem = document.querySelector('#victoryScreen p')
                game.remove();
                pElem.innerHTML = `Player ${playerIdTurn} won the game!`
                vicScreen.style.visibility = 'visible'
                return;
            }

            consoleOutput(`P${playerIdTurn} TURN: Keep going!`)



        } else {
            console.log('Failed ATT')

            sqIndex[sq].style.backgroundColor = 'grey';

            if (activePowerup[playerIdTurn] === 'jingle-bell') {
                const left = findSq.left(sq);
                const right = findSq.right(sq);
                const top = findSq.top(sq);;
                const bottom = findSq.bottom(sq);

                sqIndex[left].style.backgroundColor = isBoatHere(left) ? 'green' : 'grey';

                sqIndex[right].style.backgroundColor = isBoatHere(right) ? 'green' : 'grey';

                sqIndex[top].style.backgroundColor = isBoatHere(top) ? 'green' : 'grey';

                sqIndex[bottom].style.backgroundColor = isBoatHere(bottom) ? 'green' : 'grey';

                pwrUpProp.currentCooldown = pwrUpProp.toCooldown
                cooldownAttack(activePowerup[playerIdTurn], pwrUpProp.toCooldown)
            }

            if (activePowerup[playerIdTurn] === 'rice-blessing') {
                pwrUpProp.currentCooldown = pwrUpProp.toCooldown
                cooldownAttack(activePowerup[playerIdTurn], pwrUpProp.toCooldown);
            }

            consoleOutput(`P${playerIdTurn} TURN: You found NO boats here. :(`)

            await delay(1000)

            let newPlr = playerIdTurn == 1 ? 2 : 1;

            generateSqs(newPlr)

            playerIdTurn = newPlr
            charBarId = playerCharacters[playerIdTurn] == 'shaman' ? 'shamanPowerBar' : 'riceFarmerPowerBar'

            console.log(charBarId)

            switchToCharBar(charBarId)

            consoleOutput(`P${playerIdTurn} TURN: Your turn! Attack as you please!`)
        }

        turnCount++

        // if a powerup is on cooldown, reduce it by one turn
        console.log('reduce')
        for (const [key, pwrUp] of Object.entries(powerupProperties)) {
            if (pwrUp.currentCooldown > 0) {
                pwrUp.currentCooldown--;
            };
        };

        console.log('Turn: ' + turnCount)

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
    const playerToAttack = playerIdTurn === 1 ? 2 : 1
    const boatPosDir = boatPositions[playerToAttack];
    for (const [key, value] of Object.entries(boatPosDir)) { // [key, value] of Object.entries(list)
        for (let sqArr of value) {
            for (let sqOfArr of sqArr) {
                if (sqOfArr === sq) return true;
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

function arraysEqual(a, b) {
    a.sort();
    b.sort();
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function hasPlayerWon(plrId) {
    let succBoatSqs = [];
    let otherPlrBoats = [];
    for (let sqTable of savedPlrPos[plrId]) {
        if (sqTable[1] === true) succBoatSqs.push(sqTable[0]);
    };

    for (const [key, value] of Object.entries(boatPositions[plrId === 1 ? 2 : 1])) {
        for (let sqSet of value) {
            for (let sq of sqSet) {
                otherPlrBoats.push(sq)
            }
        }
    }

    return arraysEqual(succBoatSqs, otherPlrBoats)
}

function generateSqs(plrId) {
    const plrPos = savedPlrPos[plrId];
    for (const [key2, sq] of Object.entries(sqIndex)) {
        sqIndex[key2].style.backgroundColor = 'white'
    }
    if (plrPos.length < 1) return;
    for (let sqTabl of plrPos) {
        sqIndex[sqTabl[0]].style.backgroundColor = sqTabl[1] === true ? "red" : "grey"
    }
}

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

            playerIdTurn = 1;

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
    let otherCharBarId = (targetBarId === 'shamanPowerBar') ? "riceFarmerPowerBar" : "shamanPowerBar";
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
    return boatPositions[playerIdTurn][boatType].length - maxAllowedBoat;
}

// findSq.top,       findSq.left,    findSq.right,       findSq.bottom, 
// findSq.topRight, findSq.topLeft, findSq.bottomLeft, findSq.bottomRight

// const alphabet

function alphaFind(letter, offset) { // returns the letter based off offset. (e.g letter = 'B', offset = 1, returns C)
    const nextAlpha = alphabet[alphabet.indexOf(letter) + offset]
    if (!nextAlpha) return letter
    return nextAlpha;
}

function numberFind(number, offset) {
    const nextNumber = parseInt(number) + offset;
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

// Powerups Handler
for (let attElem of document.querySelectorAll('.attack')) {
    let id = attElem.classList[0];
    let statusElem = game.querySelector(`.${id} + p`)
    attElem.onclick = function () {
        if (statusElem.innerHTML === 'READY TO USE' && activePowerup[playerIdTurn] === null && ongoingTurn === false) {
            activePowerup[playerIdTurn] = id;

            statusElem.innerHTML = 'ACTIVE';
            statusElem.style.background = 'orange';

            consoleOutput(`P${playerIdTurn} TURN: You selected powerup: ${id}.`)

        };
    };
};



async function cooldownAttack(attackClass, cooldownRate) { // 'rice-blessing', '2' <-- how much turns until we turn it to green again 
    let attElem = document.querySelector(`.${attackClass} + p`);
    let pwrUpProp = powerupProperties[attackClass];

    activePowerup[playerIdTurn] = null;

    attElem.innerHTML = `WAIT FOR ${pwrUpProp.currentCooldown} TURNS`
    attElem.style.backgroundColor = 'red'

    let id = setInterval(function () { // check every .5s to see if the cooldown is done
        attElem.innerHTML = `WAIT FOR ${pwrUpProp.currentCooldown} TURNS`
        if (pwrUpProp.currentCooldown === 0) {
            resetAttack(attackClass);
            clearInterval(id)
        };
    }, 500);
}

function resetAttack(attackClass) {
    let attElem = document.querySelector(`.${attackClass} + p`);

    attElem.innerHTML = 'READY TO USE';
    attElem.style.backgroundColor = 'green';
}

// let i = 0

// let id = setInterval(function () {
//     console.log(id)
//     if (i === 3) clearInterval(id);
//     i++
// }, 1000)

// console.log('done')

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getUnknownBoatSq(currentPlrId) {
    const plrToAtt = playerIdTurn === 1 ? 2 : 1;

    let found = null;

    do {
        
        let randSq = getRandBoatSqFromPlrId(plrToAtt);
        found = randSq;

        console.log(savedPlrPos[currentPlrId])

        for (let sqTabl of savedPlrPos[currentPlrId]) {
            if (sqTabl[0] === randSq && sqTabl[1] === true) found = null;
        }

    } while (found === null)

    return found
    // pick a number 0-2 - 0 = basket, 1 = bamboo, 2 = fishing
}

function getRandBoatSqFromPlrId(plrId) {
    const boatPosDir = boatPositions[plrId];
    let randBoat = getRandomInt(3);

    if (randBoat === 0) { randBoat = 'basket' }
    else if (randBoat === 1) { randBoat = 'bamboo' }
    else { randBoat = 'fishing' }

    const randBoatList = boatPosDir[randBoat];
    const singleRandBoat = randBoatList[getRandomInt(randBoatList.length)];
    const randBoatSq = singleRandBoat[getRandomInt(singleRandBoat.length)]


    return randBoatSq
    // for (const [key, value] of Object.entries(boatPosDir)) {
}