export function initTaskListDateSelector() {
    const taskListDateSelectors = document.getElementsByClassName("task-list-date-selector");

    for (const taskListDateSelector of taskListDateSelectors) {
        const dateInput = taskListDateSelector.querySelector(".task-list-date-selector-input");
        const dateButton= taskListDateSelector.querySelector(".task-list-date-selector-button");
        
        if (!dateButton || !dateInput) {
            console.error("Failed to find date selector input or button.", dateInput, dateButton);
            continue;
        }

        dateButton.addEventListener("click", () => {
            const input = dateInput as HTMLInputElement;
            // @ts-ignore
            if (dateInput.showPicker) {
                input.showPicker();
            } else {
                input.focus();
            }
        });
        
        dateInput.addEventListener("change", () => {
            const selectedDate = (dateInput as HTMLInputElement).value;
            const params = new URLSearchParams(window.location.search);

            if (selectedDate) {
                params.set("startDate", selectedDate);
                params.set("endDate", selectedDate);
            } else {
                params.delete("startDate");
                params.delete("endDate");
            }

            window.location.search = params.toString();
        });
    }
}

initTaskListDateSelector();