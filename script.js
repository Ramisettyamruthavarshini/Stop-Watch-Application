let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;

const timeElement = document.getElementById('time');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');

startStopBtn.addEventListener('click', startStop);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', reset);

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTime, 1000 / 60);
        startStopBtn.textContent = 'Pause';
        startStopBtn.style.backgroundColor = '#FF9800'; // Change color to orange
        lapBtn.disabled = false;
        resetBtn.disabled = false;
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        startStopBtn.style.backgroundColor = '#4CAF50'; // Change color back to green
        running = false;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const time = new Date(difference);
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(time.getUTCMilliseconds()).slice(0, 2).padStart(2, '0');
    timeElement.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
    const lapTime = timeElement.textContent;
    const li = document.createElement('li');
    li.textContent = lapTime;
    lapsList.appendChild(li);
}

function reset() {
    clearInterval(timerInterval);
    timeElement.textContent = '00:00:00';
    lapsList.innerHTML = '';
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#4CAF50'; // Change color back to green
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    running = false;
    difference = 0;
}
