const clock = document.querySelector('#clock');

document.querySelectorAll('.timerOption').forEach(option => {
    option.addEventListener('click', () => {
        const selectedTimer = option.getAttribute('data-timer');
        window.location.href = `${selectedTimer}.html`;
    });
});

let amrapButton = document.querySelector('#amrapButton')
amrapButton.addEventListener('click', (e) => {
    e.preventDefault();
    const duration = parseInt(document.querySelector('#amrapDuration').value);
    if (isNaN(duration) || duration <= 0) {
        alert('Please enter a valid duration in minutes.');
        return;
    } else {
        console.log(`Starting AMRAP for ${duration} minutes`);
        countDown(minutesToSeconds(duration));
    }
});

let timerButton = document.querySelector('#timerButton')

// Replace the inline stop handler by a single shared interval reference:
let countUpInterval = null;
let totalSeconds = 0;

timerButton.addEventListener('click', (e) => {
    e.preventDefault();

    // If a timer is already running, clear it first
    if (countUpInterval) {
        clearInterval(countUpInterval);
        countUpInterval = null;
    }

    totalSeconds = 0;
    countUpInterval = setInterval(() => {
        totalSeconds++;
        const { minutes, seconds } = minutesAndSeconds(totalSeconds);
        clock.textContent = `Elapsed time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
});

// Single stop handler attached once
const stopBtn = document.querySelector('#stopTimer');
stopBtn.addEventListener('click', () => {
    if (countUpInterval) {
        clearInterval(countUpInterval);
        countUpInterval = null;
        alert(`Timer stopped at ${totalSeconds} seconds.`);
    } else {
        // optional: ignore or show "no timer running"
    }
});

function minutesToSeconds(minutes) {
    return minutes * 60;
}

function minutesAndSeconds(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return { minutes, seconds };
}

function countDown(seconds) {
    let remaining = seconds;
    const interval = setInterval(() => {
        if (remaining <= 0) {
            clock.textContent = `Time's up!`;
            clearInterval(interval);
            return;
        }
        const { minutes, seconds } = minutesAndSeconds(remaining);
        clock.textContent = `Time remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        remaining--;
    }, 1000);
}