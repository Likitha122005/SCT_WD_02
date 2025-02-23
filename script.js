// Get elements
const startPauseButton = document.getElementById('startPauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const timeDisplay = document.getElementById('timeDisplay');
const lapList = document.getElementById('lapList');

// Stopwatch variables
let running = false;
let startTime = 0;
let updatedTime = 0;
let lapCount = 1;
let interval;

// Format time as MM:SS:MS
function formatTime(timeInMillis) {
    const minutes = Math.floor(timeInMillis / 60000);
    const seconds = Math.floor((timeInMillis % 60000) / 1000);
    const milliseconds = timeInMillis % 1000;
    return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(number, length = 2) {
    return number.toString().padStart(length, '0');
}

// Start or pause the stopwatch
function startPauseStopwatch() {
    if (!running) {
        startTime = Date.now() - updatedTime;
        interval = setInterval(() => {
            updatedTime = Date.now() - startTime;
            timeDisplay.textContent = formatTime(updatedTime);
        }, 10);
        running = true;
        startPauseButton.textContent = 'Pause';
        lapButton.disabled = false;
    } else {
        clearInterval(interval);
        running = false;
        startPauseButton.textContent = 'Resume';
    }
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(interval);
    running = false;
    updatedTime = 0;
    startPauseButton.textContent = 'Start';
    lapButton.disabled = true;
    lapList.innerHTML = '';
    timeDisplay.textContent = '00:00:00.000';
    lapCount = 1;
}

// Record a lap time
function recordLap() {
    const lapTime = formatTime(updatedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount++}: ${lapTime}`;
    lapList.appendChild(lapItem);
}

// Event listeners
startPauseButton.addEventListener('click', startPauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
