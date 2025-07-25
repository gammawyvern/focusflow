import React from 'react';

const TaskRow = ({ task, onUpdate, onDelete }) => {
    return (
        <tr className="task-row">
            <td className="task-row-completed">
                <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={(e) => onUpdate(task.id, 'isCompleted', e.target.checked)}
                />
            </td>
            
            <td className="task-row-info">
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
            
                <td className="task-row-due-date">
                <input
                    type="date"
                    value={task.dueDate}
                    onChange={(e) => onUpdate(task.id, 'dueDate', e.target.value)}
                />
            </td>
            
            <td className="task-row-time-logged">
                <div className="task-row-time-logged-container">
                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={Math.floor(task.secondsLogged / 3600)}
                        onChange={(e) => {
                            const hours = Math.max(0, parseInt(e.target.value) || 0);
                            const minutes = Math.floor((task.secondsLogged % 3600) / 60);
                            onUpdate(task.id, 'secondsLogged', hours * 3600 + minutes * 60);
                        }}
                    />
                    :
                    <input
                        type="number"
                        min="0"
                        max="59"
                        step="1"
                        value={Math.floor((task.secondsLogged % 3600) / 60)}
                        onChange={(e) => {
                            const minutes = Math.min(59, Math.max(0, parseInt(e.target.value) || 0));
                            const hours = Math.floor(task.secondsLogged / 3600);
                            onUpdate(task.id, 'secondsLogged', hours * 3600 + minutes * 60);
                        }}
                    />
                </div>
            </td>
            
            <td className="task-row-actions">
                <button onClick={(e) => onDelete(task.id)} className="accent-2">Delete</button>
                {/* Could have a duplicate button later on. */}
            </td>
        </tr>
    )
}

export default TaskRow;