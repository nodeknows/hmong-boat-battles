// when the window size changes, we want to readjust the amount of mountains the screen has

const mountTop = document.getElementById('mountain-top');
const mountBottom = document.getElementById('mountain-bottom')
const img_length = 100;

let mountain_count = 0;

function createMountain() {
    let img = document.createElement('img');
    img.setAttribute('src', 'imgs/mountain-white.png');
    img.setAttribute('alt', '');
    return img;
}

function readjustMountains() {
    const required_imgs = Math.round(window.screen.width / img_length) + 1;
    if (mountain_count < required_imgs) {
        do {
            let img_top = createMountain();
            let img_bottom = createMountain();
            mountTop.appendChild(img_top)
            mountBottom.appendChild(img_bottom)

            mountain_count++
        } while (mountain_count < required_imgs)
    }
}

readjustMountains()

window.onresize = readjustMountains;

