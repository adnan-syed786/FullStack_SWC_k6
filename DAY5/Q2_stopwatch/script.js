const timeEl = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

let elapsedMs = 0;
let startTime = 0;
let timerId = null;

function formatTime(totalMs) {
  const totalSeconds = Math.floor(totalMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

function updateDisplay() {
  const now = Date.now();
  const runningMs = timerId ? now - startTime : 0;
  timeEl.textContent = formatTime(elapsedMs + runningMs);
}

function startStopwatch() {
  if (timerId) return;

  startTime = Date.now();
  timerId = setInterval(updateDisplay, 200);
}

function pauseStopwatch() {
  if (!timerId) return;

  elapsedMs += Date.now() - startTime;
  clearInterval(timerId);
  timerId = null;
  updateDisplay();
}

function resetStopwatch() {
  pauseStopwatch();
  elapsedMs = 0;
  updateDisplay();
}

startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);

updateDisplay();
