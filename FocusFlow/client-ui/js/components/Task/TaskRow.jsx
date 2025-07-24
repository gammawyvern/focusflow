import React from 'react';

const TaskRow = ({ task, onUpdate, onDelete }) => {
    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={(e) => onUpdate(task.id, 'isCompleted', e.target.checked)}
                />
            </td>
            <td>
                <input
                    type="text"
                    value={task.title}
                    onChange={(e) => onUpdate(task.id, 'title', e.target.value)} 
                />
                <textarea
                    value={task.description}
                    onChange={(e) => onUpdate(task.id, 'description', e.target.value)}
                />
            </td>
            <td>
                <input
                    type="date"
                    value={task.dueDate}
                    onChange={(e) => onUpdate(task.id, 'dueDate', e.target.value)}
                />
            </td>
            <td>
                <input
                    type="number"
                    value={task.secondsLogged}
                    onChange={(e) => onUpdate(task.id, 'secondsLogged', Number(e.target.value))}
                />
            </td>
            <td>
                <button onClick={(e) => onDelete(task.id)} className="accent-2">Delete</button>
                {/* Could have a duplicate button later on. */}
            </td>
        </tr>
    )
}

export default TaskRow;