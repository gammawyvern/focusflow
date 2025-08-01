function initTaskListForms() {
    /* Task Create Button. */
    const taskCreateButtons = document.querySelectorAll(".js-task-create");
    if (taskCreateButtons.length > 0) {
        taskCreateButtons.forEach((button) => {
            button.addEventListener("click", handleTaskCreateClick)
        });
    }

    /* Date Selector Form. */
    const taskListDateSelectors = document.getElementsByClassName("task-list-date-selector");
    for (const taskListDateSelector of taskListDateSelectors) {
        taskListDateSelector.addEventListener("change", () => handleTaskListDateSelectorChange(taskListDateSelector as HTMLInputElement));
    }
    
    /* Show Completed Form. */
    const taskListCompleteToggleForms = document.getElementsByClassName("js-task-list-complete-toggle-form");
    for (const taskListCompleteToggleForm of taskListCompleteToggleForms) {
        taskListCompleteToggleForm.addEventListener("submit", (e) => handleCompletedToggleClick(e, taskListCompleteToggleForm as HTMLFormElement));
    }
}

/* Handlers For actions. */

async function handleTaskCreateClick() {
    await fetch("/api/tasks", { method: "POST" });
    window.location.reload();
}

function handleTaskListDateSelectorChange(taskListDateSelector: HTMLInputElement) {
    const selectedDate = (taskListDateSelector as HTMLInputElement).value;
    const params = new URLSearchParams(window.location.search);

    if (selectedDate) {
        params.set("startDate", selectedDate);
        params.set("endDate", selectedDate);
    } else {
        params.delete("startDate");
        params.delete("endDate");
    }

    window.location.search = params.toString();
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

/* Call Forms Initializer. */

document.addEventListener("DOMContentLoaded", () => {
    initTaskListForms();
})