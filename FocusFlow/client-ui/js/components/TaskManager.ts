
function initTaskForms() {
    /* Task Create Button. */
    const taskCreateButtons = document.querySelectorAll(".js-task-create");
    if (taskCreateButtons.length > 0) {
        taskCreateButtons.forEach((button) => {
            button.addEventListener("click", handleTaskCreateClick)
        });
    }
    
    /* Task Delete Form. */
    const taskDeleteForms= document.querySelectorAll(".js-task-delete-form");
    taskDeleteForms.forEach((form) => {
        form.addEventListener("submit", (e) => handleTaskDeleteSubmit(e, form as HTMLFormElement));
    });

    /* Task Complete Form. */
    const taskCompleteForms = document.querySelectorAll(".js-task-complete-form");
    taskCompleteForms.forEach((form) => {
        form.addEventListener("submit", (e) => handleTaskCompleteSubmit(e, form as HTMLFormElement));
    });

    /* Task Active Form. */
    const taskActiveForms = document.querySelectorAll(".js-task-active-form");
    taskActiveForms.forEach((form) => {
        form.addEventListener("submit", (e) => handleTaskActiveSubmit(e, form as HTMLFormElement));
    });

    /* Task Edit Form. */
    const taskEditForms = document.querySelectorAll(".js-task-edit-form");
    taskEditForms.forEach((form) => {
        form.addEventListener("submit", (e) => handleTaskEditSubmit(e, form as HTMLFormElement));
    });
}

/* Handlers For actions. */

async function handleTaskCreateClick() {
    await fetch("/api/tasks", { method: "POST" });
    window.location.reload();
}

async function handleTaskDeleteSubmit(deleteFormEvent: Event, deleteForm: HTMLFormElement) {
    deleteFormEvent.preventDefault();
    const formData = new FormData(deleteForm);
    const taskId = formData.get("id") as string;
    await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
    window.location.reload();
}

async function handleTaskCompleteSubmit(completeFormEvent: Event, completeForm: HTMLFormElement) {
    completeFormEvent.preventDefault();
    const formData = new FormData(completeForm);
    const id = formData.get("id");
    const complete = formData.get("complete") === "true";
    
    await fetch(`/api/tasks/${id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: complete }),
    });
    
    window.location.reload();
}

async function handleTaskActiveSubmit(activeFormEvent: Event, completeForm: HTMLFormElement) {
    activeFormEvent.preventDefault();
    const formData = new FormData(completeForm);
    const id = formData.get("id");
    const active = formData.get("active") === "true";

    await fetch(`/api/tasks/${id}/active`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: active }),
    });

    window.location.reload();
}

async function handleTaskEditSubmit(editFormEvent: Event, editForm: HTMLFormElement) {
    editFormEvent.preventDefault();
    const formData = new FormData(editForm);
    const id = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");
    const dueDate = formData.get("dueDate");
    const displayMinutes = Number(formData.get("displayMinutes"));
    const displaySeconds = Number(formData.get("displaySeconds"));
    const secondsLogged = (displayMinutes * 60) + displaySeconds;
    
    const patchPayload = {
        id: id,
        title: title,
        description: description,
        dueDate: dueDate,
        secondsLogged: secondsLogged
    }

    console.log(JSON.stringify(patchPayload));

    await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchPayload),
    });

    window.location.reload();
}


document.addEventListener("DOMContentLoaded", () => {
    initTaskForms();
})