const startRef = document.querySelector("[data-start]");
const stopRef = document.querySelector("[data-stop]");
let timerId = null;

startRef.addEventListener("click", onStart);
stopRef.addEventListener("click", onStop);

stopRef.disabled = true;

function onStart(_e) {
  startRef.disabled = true;
  stopRef.disabled = false;
  timerId = setInterval(() => document.body.style.backgroundColor = getRandomHexColor(), 1000);
}

function onStop(_e) {
  clearInterval(timerId);
  stopRef.disabled = true;  
  startRef.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}