import React from 'react';

import { formatSeconds, formatDate } from "../../utils/taskFormatters";

const TaskRow = ({ task }) => {
    return (
        <tr>
            <td>{task.isCompleted ? "Complete" : "Incomplete"}</td>
            <td>
                <p>{task.title}</p>
                <p>{task.description}</p>
            </td>
            <td>{formatDate(task.dueDate)}</td>
            <td>{formatSeconds(task.secondsLogged)}</td>
            <td>
                <button>[E]</button>
                <button>[D]</button>
            </td>
        </tr>
    )
}

export default TaskRow;