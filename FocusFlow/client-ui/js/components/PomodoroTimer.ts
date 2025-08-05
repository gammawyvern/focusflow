import moment, { Moment, Duration, duration } from "moment";

const FOCUS_DURATION: Duration = moment.duration(25 * 60, "seconds");
const BREAK_DURATION: Duration = moment.duration(5 * 60, "seconds");

function initPomodoroTimer() {
    const timers = document.querySelectorAll(".js-timer");
    
    for (const timer of timers) {
        const display = timer.querySelector(".js-timer-display") as HTMLElement;
        const title = timer.querySelector(".js-timer-title") as HTMLElement;
        const pausePlayButton = timer.querySelector(".js-timer-play-pause") as HTMLElement;
        const resetButton = timer.querySelector(".js-timer-reset") as HTMLElement;
        
        if (!display || !title || !pausePlayButton || !resetButton) {
            console.error("Failed to find timer elements.");
            return;
        }
        
        /* Timer Setup On Load. */
        
        const newActiveTask: string | null = (timer as HTMLElement).dataset.taskId ?? null; 
        let activeTask: string | null = localStorage.getItem("activeTask") ?? null; 
        let startedTime: string | null = localStorage.getItem("startedTime");
        let timeOffset: number = Number(localStorage.getItem("timeOffset") ?? 0);

        display.textContent = formatTimeElapsed(moment(startedTime), moment(), duration(timeOffset, "seconds"));

        if (!!startedTime) {
            stopTimer().then(startTimer);
        }
        
        activeTask = newActiveTask;
        localStorage.setItem("activeTask", activeTask ?? "");

        /* Interval / Counter Handlers. */
        
        let intervalId: NodeJS.Timeout;
        
        function startCounter() {
            intervalId = setInterval(() => {
                display.textContent = formatTimeElapsed(moment(startedTime), moment(), duration(timeOffset, "seconds"));
            }, 500)
        }
        
        function stopCounter() {
            clearInterval(intervalId);
        }
        
        /* Timer Handlers. */
        
        async function startTimer(): Promise<void> {
            if (startedTime) return;
            
            startedTime = moment().format();
            localStorage.setItem("startedTime", startedTime);
            
            startCounter();
        }

        async function stopTimer(): Promise<void> {
            if (!startedTime) return;
            
            stopCounter();
            const stoppedTime = moment();
            const timeElapsed = stoppedTime.diff(startedTime, "seconds");
            if (activeTask) await LogSecondsToTaskDb(activeTask, timeElapsed);
            
            startedTime = null;
            timeOffset += timeElapsed;

            localStorage.setItem("startedTime", startedTime ?? "");
            localStorage.setItem("timeOffset", String(timeOffset)); 
        }
        
        async function resetTimer() {
            await stopTimer();
            
            timeOffset = 0;
            localStorage.setItem("timeOffset", String(timeOffset));
            display.textContent = formatDuration(duration(timeOffset, "seconds"));
        }
        
        /* Add Timer Event Listeners. */

        pausePlayButton.addEventListener("click", () => {
            startedTime ? stopTimer() : startTimer();
        });
        
        resetButton.addEventListener("click", () => {
            resetTimer();
        });
    }
}

/* Helpers. */
 
async function LogSecondsToTaskDb(taskId: string, seconds: number) {
    const response = await fetch(`/api/tasks/${taskId}`);
    if (response.ok) {
        const taskDto = await response.json();
        taskDto.secondsLogged += seconds;
        await fetch(`/api/tasks/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskDto)
        });
    }
}

function formatTimeElapsed(startTime: Moment, endTime: Moment, timeElapsedOffset: Duration) {
    let timeElapsed: Duration = duration(endTime.diff(startTime, "seconds"), "seconds");
    timeElapsed = timeElapsed.isValid() ? timeElapsed.add(timeElapsedOffset) : timeElapsedOffset;
    return formatDuration(timeElapsed); 
}

function formatDuration(duration: Duration): string {
    if (!duration.isValid()) duration = moment.duration();
    return `${padNumber(duration.minutes())}:${padNumber(duration.seconds())}`;
}

function padNumber(num: number): string {
    return String(num).padStart(2, "0");
}

/* Init call. */

document.addEventListener("DOMContentLoaded", () => {
    initPomodoroTimer();
})