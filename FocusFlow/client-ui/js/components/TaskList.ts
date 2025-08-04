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

    /* Sublist Expand Form. */
    const taskSublists = document.querySelectorAll(".js-task-sublist");
    for (const taskSublist of taskSublists) {
        setupSublistExpandHandler(taskSublist as HTMLElement);
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

function setupSublistExpandHandler(taskSublist: HTMLElement) {
    const expandButtons = taskSublist.querySelectorAll(".task-sublist-header-expand"); 
    for (const expandButton of expandButtons) {
        expandButton.addEventListener("click", () => {
            handleTaskSublistExpandClick(taskSublist);
        });
    }
}

function handleTaskSublistExpandClick(taskSublist: HTMLElement) {
    const isExpanded = taskSublist.classList.contains("expanded")
    const sublistContent = taskSublist.querySelectorAll(".task-sublist-content");
    
    for (const content of sublistContent) {
        (content as HTMLElement).style.display = isExpanded ? "none" : "";
    }
    
    taskSublist.classList.toggle("expanded");
}

/* Call Forms Initializer. */

document.addEventListener("DOMContentLoaded", () => {
    initTaskListForms();
})