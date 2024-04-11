// Belts
var belt = document.querySelectorAll('.belt')

function getClone() {
    let i = document.createElement('img');
    i.setAttribute('src', "imgs/home-white.png")
    i.style.position = 'relative'
    return i
}
for (let i = 0; i <= 90; i++) {
    let t = getClone(), b = getClone();
    t.setAttribute('class', "top-kungfu")
    belt[0].appendChild(t)
    b.setAttribute('class', "bottom-kungfu")
    belt[1].appendChild(b)
}

// Plz don't leave
// window.onbeforeunload = function (e) {
//     return 'Are you sure you want to leave? You are in the middle of something.';
// };

// When user presses play
const delay = ms => new Promise(res => setTimeout(res, ms));

var game = document.getElementById('game')
let intro = document.getElementById('intro')
let form = document.querySelector('#intro form')
let play = document.querySelector('#intro button')
let h1sec = document.querySelector('#intro section')
let h1s = document.querySelectorAll('#intro h1');

const swooshAway = async(elem, del) => {
    await delay(del)
    elem.animate(
        [{ opacity: 0 }],
        {duration: 250, fill: 'forwards'}
    )
}

let o = 0

play.addEventListener("click", async function (event) {
    event.preventDefault()

    if (o>0) return;
    
    o++
    
    swooshAway(h1s[0], 0)
    swooshAway(h1s[1], 250)
    swooshAway(h1s[2], 500)
    
    await delay(1250)
    h1sec.remove()

    form.style.position = 'absolute'

    play.innerHTML = ''
    play.style.transition = "all 1s"
    play.style.zIndex = 5
    play.style.filter = "drop-shadow(0 0 2rem rgb(255, 255, 255))"
    play.style.top = "50%"
    play.style.width = '100%'
    play.style.borderRadius = 0

    await delay(1000)
    play.style.height = '100vh'
    await delay(1000)
    play.style.height = '0vh'
    game.style.visibility = "visible"
    await delay(1000)
    play.style.width = 0
    await delay(500)
    play.style.opacity = 0
    await delay(1000)
    intro.remove()
});

