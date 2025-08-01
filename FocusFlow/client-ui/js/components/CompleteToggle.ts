function initTaskListCompleteToggle() {
    const taskListCompleteToggleForms = document.getElementsByClassName("js-task-list-complete-toggle-form");
    
    for (const taskListCompleteToggleForm of taskListCompleteToggleForms) {
        taskListCompleteToggleForm.addEventListener("submit", (e) => handleCompletedToggleClick(e, taskListCompleteToggleForm as HTMLFormElement));
    }
}

function handleCompletedToggleClick(toggleCompleteEvent: Event, toggleCompleteForm: HTMLFormElement) {
    toggleCompleteEvent.preventDefault();
    const formData = new FormData(toggleCompleteForm);
    const showCompleted = formData.get("showCompleted") === "true";
    
    const params = new URLSearchParams(window.location.search);
    if (!showCompleted) {
        params.set("showCompleted", String(showCompleted));
    } else {
        params.delete("showCompleted");
    }
    
    window.location.search = params.toString();
}

document.addEventListener("DOMContentLoaded", () => {
    initTaskListCompleteToggle();
})