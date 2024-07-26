function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

const btnStyling = document.querySelectorAll("button");
for (let i = 0; i < btnStyling.length; i++ ) {
    btnStyling[i].style.textTransform = 'uppercase';
    btnStyling[i].style.padding = '16px';
    btnStyling[i].style.textAlign = "center";
}

const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
let timerID = null;
stopBtn.disabled = true;

startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timerID = setInterval(() => {
        const randomColor = getRandomHexColor();
        document.body.style.backgroundColor = randomColor;
    }, 1000);
});

stopBtn.addEventListener("click", () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerID);
});