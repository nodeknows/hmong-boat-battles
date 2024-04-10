document.querySelector('button').addEventListener("click", function(event) {
    event.preventDefault()
    window.open('/play.html', '_self')
});

var belt = document.querySelectorAll('.belt')

function getClone() {
    let i = document.createElement('img');
    i.setAttribute('src', "imgs/home-white.png")
    return i
}
for (let i = 0; i <= 90; i++) {
    let t = getClone(), b = getClone();
    belt[0].appendChild(t)
    belt[1].appendChild(b)
}