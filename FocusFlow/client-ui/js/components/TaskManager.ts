
function initTaskForms() {
    /* Task Create Button. */
    const taskCreateButtons = document.querySelectorAll(".js-task-create");
    if (taskCreateButtons.length > 0) {
        taskCreateButtons.forEach((button) => {
            button.addEventListener("click", handleTaskCreateClick)
        });
    }
    
    /* Task Delete Button. */
    const taskDeleteForms= document.querySelectorAll(".js-task-delete-form");
    if (taskDeleteForms.length > 0) {
        taskDeleteForms.forEach((form) => {
            form.addEventListener("submit", (e) => handleTaskDeleteClick(e, form as HTMLFormElement));
        });
    }
    
    const taskCompleteForms = document.querySelectorAll(".js-task-complete-form");
    if (taskCompleteForms.length > 0) {
        taskCompleteForms.forEach((form) => {
            form.addEventListener("submit", (e) => handleTaskCompleteClick(e, form as HTMLFormElement));
        });
    }
}

/* Handlers For actions. */

async function handleTaskCreateClick() {
    await fetch("/api/tasks", { method: "POST" });
    window.location.reload();
}

async function handleTaskDeleteClick(deleteFormEvent: Event, deleteForm: HTMLFormElement) {
    deleteFormEvent.preventDefault();
    const formData = new FormData(deleteForm);
    const taskId = formData.get("id") as string;
    await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
    window.location.reload();
}

async function handleTaskCompleteClick(createFormEvent: Event, completeForm: HTMLFormElement) {
    createFormEvent.preventDefault();
    const formData = new FormData(completeForm);
    const id = formData.get("id");
    const complete = formData.get("complete") === "true";
    
    console.log(JSON.stringify({ complete }));
    
    await fetch(`/api/tasks/${id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete }),
    });
    
    window.location.reload();
}


document.addEventListener("DOMContentLoaded", () => {
    initTaskForms();
})