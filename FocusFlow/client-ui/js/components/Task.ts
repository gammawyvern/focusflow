import { TaskPatchDto, TaskActiveDto, TaskCompleteDto } from "../types/Task.dto";

function initTaskForms() {
    /* Task Delete Form. */
    const taskDeleteForms = document.querySelectorAll(".js-task-delete-form");
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
        const taskEditEnableButton = form.querySelector(".js-task-edit") as HTMLButtonElement;
        const taskEditSaveButton = form.querySelector(".js-task-save") as HTMLButtonElement;
        if (!taskEditEnableButton || !taskEditSaveButton) { return; }
        
        taskEditEnableButton.addEventListener("click", () => handleTaskEditEnableClick(form as HTMLFormElement))
        form.addEventListener("submit", (e) => handleTaskEditSubmit(e, form as HTMLFormElement));
    });
}

/* Handlers For actions. */

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
    
    const payload: TaskCompleteDto = {
        complete: complete
    }

    await fetch(`/api/tasks/${id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    window.location.reload();
}

async function handleTaskActiveSubmit(activeFormEvent: Event, completeForm: HTMLFormElement) {
    activeFormEvent.preventDefault();
    const formData = new FormData(completeForm);
    const id = formData.get("id");
    const active = formData.get("active") === "true";
    
    const payload: TaskActiveDto = {
        active: active
    }

    await fetch(`/api/tasks/${id}/active`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    window.location.reload();
}

async function handleTaskEditSubmit(editFormEvent: Event, editForm: HTMLFormElement) {
    editFormEvent.preventDefault();
    const formData = new FormData(editForm);
    const id = formData.get("id");
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const dueDate = formData.get("dueDate") as string | null;
    const displayMinutes = Number(formData.get("displayMinutes"));
    const displaySeconds = Number(formData.get("displaySeconds"));
    const secondsLogged = (displayMinutes * 60) + displaySeconds;

    const patchPayload: TaskPatchDto = {
        title: title,
        description: description,
        dueDate: dueDate,
        secondsLogged: secondsLogged
    }

    await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchPayload),
    });

    window.location.reload();
}
    
function handleTaskEditEnableClick(taskEditForm: HTMLFormElement) {
    const editButton = taskEditForm.querySelector(".js-task-edit") as HTMLButtonElement;
    const saveButton = taskEditForm.querySelector('.js-task-save') as HTMLButtonElement;
    if (!editButton || !saveButton) { return; }
    
    document.querySelectorAll('.js-task-edit').forEach(button => {
        (button as HTMLButtonElement).style.display = 'none';
    })
    
    const inputs = taskEditForm.querySelectorAll('input, textarea');
    inputs.forEach(input => input.removeAttribute('disabled'));
    
    editButton.style.display = 'none';
    saveButton.style.display = 'inline-block';
}

document.addEventListener("DOMContentLoaded", () => {
    initTaskForms();
})