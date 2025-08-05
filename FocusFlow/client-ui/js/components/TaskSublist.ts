
function initTaskSublists() {
    /* Sublist Expand Form. */
    const taskSublists = document.querySelectorAll(".js-task-sublist");
    for (const taskSublist of taskSublists) {
        updateTaskSublist(taskSublist as HTMLElement);
        setupSublistExpandToggleHandler(taskSublist as HTMLElement);
    }
}

function setupSublistExpandToggleHandler(taskSublist: HTMLElement) {
    const expandButtons = taskSublist.querySelectorAll(".task-sublist-header-expand");
    for (const expandButton of expandButtons) {
        expandButton.addEventListener("click", () => {
            toggleTaskSublistExpanded(taskSublist);
        });
    }
}

function toggleTaskSublistExpanded(taskSublist: HTMLElement) {
    const sublistStorageKey = getSublistStorageKey(taskSublist);
    if (!sublistStorageKey) return;
    
    const isExpanded = !!(localStorage.getItem(sublistStorageKey) ?? true);
    localStorage.setItem(sublistStorageKey, isExpanded ? "" : "expanded");
    
    updateTaskSublist(taskSublist);
}

function updateTaskSublist(taskSublist: HTMLElement) {
    const sublistStorageKey = getSublistStorageKey(taskSublist);
    if (!sublistStorageKey) return;
    
    const sublistContent = taskSublist.querySelectorAll(".task-sublist-content");
    const isExpanded = !!(localStorage.getItem(sublistStorageKey) ?? true);

    taskSublist.classList.toggle("expanded", isExpanded);
    for (const content of sublistContent) {
        (content as HTMLElement).style.display = isExpanded ? "" : "none";
    }
}

function getSublistStorageKey(sublist: HTMLElement): string | null {
    const route = window.location.pathname.replace(/\//g, "_").replace(/^_/, "");
    const id = sublist.dataset.sublistId;

    if (!id) {
        console.error("Sublist is missing data-sublist-id");
        return null;
    }

    return `task-sublist:${route}:${id}`;
}

document.addEventListener("DOMContentLoaded", () => {
    initTaskSublists();
})
