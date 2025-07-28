import React, { useState } from 'react';
import { TaskProps } from './task-props';

const LongTask: React.FC<TaskProps> = ({ task, onUpdate }) => {
    const [localTask, setLocalTask] = useState(task);

    const handleChange = <K extends keyof typeof task>(key: K, value: typeof task[K]) => {
        const updated = { ...localTask, [key]: value };
        setLocalTask(updated);
        onUpdate(updated);
    };

    return (
        <div className="task long-task">
            <input
                type="checkbox"
                className="task-completed"
                checked={localTask.isCompleted}
                onChange={(e) => handleChange('isCompleted', e.target.checked)}
            />
            <input
                type="text"
                className="task-title"
                value={localTask.title}
                onChange={(e) => handleChange('title', e.target.value)}
            />
            <textarea
                className="task-description"
                value={localTask.description}
                onChange={(e) => handleChange('description', e.target.value)}
            />
            <input
                type="text"
                className="task-due-date"
                value={localTask.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
            />
            <input
                type="number"
                className="task-seconds-logged"
                value={localTask.secondsLogged}
                onChange={(e) => handleChange('secondsLogged', Number(e.target.value))}
            />
        </div>
    );
};

export default LongTask;