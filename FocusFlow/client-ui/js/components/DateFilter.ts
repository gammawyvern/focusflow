export function initTaskListDateSelector() {
    const taskListDateSelectors = document.getElementsByClassName("task-list-date-selector");

    for (const taskListDateSelector of taskListDateSelectors) {
        taskListDateSelector.addEventListener("change", () => {
            const selectedDate = (taskListDateSelector as HTMLInputElement).value;
            const params = new URLSearchParams(window.location.search);

            console.log("running handler");

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