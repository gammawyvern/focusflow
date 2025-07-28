import React from 'react';

import { TaskProps } from './taskProps';

const LongTask: React.FC<TaskProps> = ({ task, onUpdate }: TaskProps) => {
    return (
        <div className="task long-task">
            <input
                type="checkbox"
                className="task-completed"
                checked={task.isCompleted}
                onChange={(e) => onUpdate(task.id, 'isCompleted', e.target.checked)}
            />
            
            <input
                type="text"
                className="task-title"
                value={task.title}
                onChange={(e) => onUpdate(task.id, 'title', e.target.value)}
            />
            
            <textarea
                className="task-description"
                value={task.description}
                onChange={(e) => onUpdate(task.id, 'description', e.target.value)}
            />
            
            <input
                type="date"
                className="task-due-date"
                value={task.dueDate}
                onChange={(e) => onUpdate(task.id, 'dueDate', e.target.value)}
            />
            
            <input
                type="number"
                className="task-hours-logged"
                value={task.secondsLogged}
                onChange={(e) => onUpdate(task.id, 'secondsLogged', e.target.value)}
            />
            
            <input
                type="number"
                className="task-minutes-logged"
                value={task.secondsLogged}
                onChange={(e) => onUpdate(task.id, 'secondsLogged', e.target.value)}
            />
        </div>
    );
};

export default LongTask;