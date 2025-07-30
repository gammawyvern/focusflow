function enableEdit(editButton: HTMLButtonElement) {
    document.querySelectorAll('.task-edit').forEach(button => {
        (button as HTMLButtonElement).style.display = 'none';
    })
    
    const form = editButton.closest('form');
    if (!form) { return; }
    
    const saveButton: HTMLButtonElement | null = form.querySelector('.task-save');
    if (!saveButton) { return; }
    
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => input.removeAttribute('disabled'));
    editButton.style.display = 'none';

    saveButton.style.display = 'inline-block';
}

(window as any).enableEdit = enableEdit;