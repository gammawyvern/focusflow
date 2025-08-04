import moment, { Moment, Duration } from "moment";

const FOCUS_DURATION: Duration = moment.duration(25 * 60, "seconds");
const BREAK_DURATION: Duration = moment.duration(5 * 60, "seconds");

function initPomodoroTimer() {
    const timers = document.querySelectorAll(".js-timer");
    
    for (const timer of timers) {
        let activeTaskId = (timer as HTMLElement).dataset.taskId;
        let activeTaskTimeStarted = (timer as HTMLElement).dataset.startedTime;
        
        /* TODO: Calculations later on for if user leaves for long time. */
        
        const display = timer.querySelector(".js-timer-display");
        const title = timer.querySelector(".js-timer-title");
        const startButton = timer.querySelector(".js-timer-play-pause");
        const resetButton = timer.querySelector(".js-timer-reset");
        
        if (!display || !title || !startButton || !resetButton) {
            console.error("Failed to find timer elements.");
            return;
        }
        
        let secondsElapsedOffset = 0;
        let intervalId: NodeJS.Timeout;
        
        display.textContent = formatTimeElapsed(moment(activeTaskTimeStarted), moment(), secondsElapsedOffset);
        title.textContent = "Focus";

        async function startCounter(): Promise<void> {
            if (!activeTaskTimeStarted) {
                activeTaskTimeStarted = moment().format();
                
                const response = await fetch(`/api/tasks/${activeTaskId}`);
                const taskDto = await response.json();
                taskDto.startedTime = activeTaskTimeStarted;
                await fetch(`/api/tasks/${activeTaskId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(taskDto)
                });
            }

            intervalId = setInterval(() => {
                display!.textContent = formatTimeElapsed(moment(activeTaskTimeStarted), moment(), secondsElapsedOffset); 
            }, 1000)
        }

        async function stopCounter(): Promise<void> {
            if (!activeTaskTimeStarted) {
                return;
            }
            
            const secondsToLog = moment().diff(activeTaskTimeStarted, "seconds"); 
            secondsElapsedOffset += secondsToLog;
            activeTaskTimeStarted = undefined;
            clearInterval(intervalId);
            
            const response = await fetch(`/api/tasks/${activeTaskId}`);
            const taskDto = await response.json();
            taskDto.secondsLogged += secondsToLog;
            taskDto.startedTime = null;
            await fetch(`/api/tasks/${activeTaskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskDto)
            });
        }
        
        function resetCounter() {
            stopCounter();
            secondsElapsedOffset = 0;
            display!.textContent = formatTimeElapsed(moment(activeTaskTimeStarted), moment(), secondsElapsedOffset);
        }

        startButton!.addEventListener("click", () => {
            activeTaskTimeStarted ? stopCounter() : startCounter();
        });
        
        resetButton!.addEventListener("click", () => {
            resetCounter();
        })
        
        if (activeTaskTimeStarted) {
            startCounter();
        }
    }
}

/* Helpers. */

function formatTimeElapsed(startTime: Moment, endTime: Moment, secondsElapsedOffset: number) {
    let duration: Duration = moment.duration(endTime.diff(startTime));
    if (!duration.isValid()) duration = moment.duration();
    duration.add(secondsElapsedOffset, "seconds");
    
    const remaining = FOCUS_DURATION.clone().subtract(duration);
    return `${pad2(remaining.minutes())}:${pad2(remaining.seconds())}`;
}

function pad2(num: number): string {
    return String(num).padStart(2, "0");
}

/* Init call. */

document.addEventListener("DOMContentLoaded", () => {
    initPomodoroTimer();
})