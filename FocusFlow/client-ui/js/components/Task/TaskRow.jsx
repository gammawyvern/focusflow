import React from 'react';

import { formatSeconds, formatDate } from "../../utils/taskFormatters";

const TaskRow = ({ task, onDelete }) => {
    const handleDeleteClick = async () => {
        await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
        onDelete(task.id);
    };

    return (
        <tr>
            <td>{task.isCompleted ? "Complete" : "Incomplete"}</td>
            <td>
                <div>{task.title}</div>
                <div>{task.description}</div>
            </td>
            <td>{formatDate(task.dueDate)}</td>
            <td>{formatSeconds(task.secondsLogged)}</td>
            <td>
                <button>[E]</button>
                <button onClick={handleDeleteClick}>[D]</button>
            </td>
        </tr>
    )
}

export default TaskRow;