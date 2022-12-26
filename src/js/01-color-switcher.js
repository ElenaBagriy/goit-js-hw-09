const body = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

startButton.addEventListener('click', onBodyColorChange);
stopButton.addEventListener('click', onStopBtnClick);

let intervalId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function onBodyColorChange() {
    body.style.backgroundColor = getRandomHexColor();

    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    
    startButton.disabled = true;
    stopButton.disabled = false;
};

function onStopBtnClick() {
    clearInterval(intervalId);
    startButton.disabled = false;
    stopButton.disabled = true;
};
