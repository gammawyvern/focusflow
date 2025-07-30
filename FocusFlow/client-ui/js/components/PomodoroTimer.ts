import moment, { Moment, Duration } from "moment";

function formatTimeElapsed(startTime: Moment, endTime: Moment, secondsElapsedOffset: number) {
    const duration: Duration = moment.duration(endTime.diff(startTime)).add(secondsElapsedOffset);
    return formatDuration(duration);
}

function formatDuration(duration: Duration): string {
    return `${pad2(duration.hours())}h ${pad2(duration.minutes())}m ${pad2(duration.seconds())}s`;
}

function pad2(num: number): string {
    return String(num).padStart(2, "0");
}

function initPomodoroTimer() {
    const timers = [...document.getElementsByClassName("js-pomodoro-timer")];
    
    for (const timer of timers) {
        // @ts-ignore
        let activeTaskId = timer.dataset.taskId;
        if (!activeTaskId) { continue; }
        
        let secondsElapsed = 0;
        let secondsElapsedOffset = 0;
        // TODO: Set offset based on the initial runningTime string
        
        let running = false;
        // TODO: Set running based on a new entity var? 
        let intervalId: NodeJS.Timeout;

        const runningTime = timer.querySelector(".js-pomodoro-running-time");
        const startButton = timer.querySelector(".js-pomodoro-start");
        // const stopButton = timer.querySelector(".js-pomodoro-stop");

        if (!runningTime || !startButton /*|| !stopButton*/) {
            console.error("Failed to find time text, start button, or stop button element(s).", runningTime, startButton /*, stopButton*/);
            continue;
        }
        
        runningTime.textContent = formatDuration(moment.duration());
        
        async function startCounter(): Promise<void> {
            const response = await fetch(`/api/tasks/${activeTaskId}`);
            const taskDto = await response.json();
            
            const startedTime = moment()
            taskDto.startedTime = startedTime.format();

            await fetch(`/api/tasks/${activeTaskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskDto)
            });

            startButton!.textContent = "Pause";

            intervalId = setInterval(() => {
                runningTime!.textContent = formatTimeElapsed(taskDto.startedTime, moment(), secondsElapsedOffset)
            }, 1000)
        }

        async function stopCounter(): Promise<void> {
            clearInterval(intervalId);
            
            const response = await fetch(`/api/tasks/${activeTaskId}`);
            const taskDto = await response.json();

            const start: Moment = moment(taskDto.startedTime);
            const secondsToLog: number = moment().diff(start, 'seconds');
            secondsElapsedOffset += secondsToLog;
            taskDto.secondsLogged += secondsToLog;
            taskDto.startedTime = null;
            
            await fetch(`/api/tasks/${activeTaskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskDto)
            });

            startButton!.textContent = "Start";
        }

        startButton.addEventListener("click", () => {
            running ? stopCounter() : startCounter();
            running = !running;
        });
    }
}

initPomodoroTimer();
