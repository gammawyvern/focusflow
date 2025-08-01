function initTaskListDateSelector() {
    const taskListDateSelectors = document.getElementsByClassName("task-list-date-selector");

    for (const taskListDateSelector of taskListDateSelectors) {
        taskListDateSelector.addEventListener("change", () => handleTaskListDateSelectorChange(taskListDateSelector as HTMLInputElement)); 
    }
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

document.addEventListener("DOMContentLoaded", () => {
    initTaskListDateSelector();
})