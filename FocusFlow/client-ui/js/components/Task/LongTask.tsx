import React from 'react';

import { TaskProps } from './taskProps';

const LongTask: React.FC<TaskProps> = ({ task, active, onUpdate, onDelete, onComplete, onSetActive }: TaskProps) => {
    return (
        <div className={"task long-task" + (active ? " active" : "")}>
            <button
                className={"task-set-complete" + (task.isCompleted ? ' complete' : '')}
                onClick={() => {
                    if (onComplete) onComplete(task.id);
                    onUpdate(task.id, "isCompleted", !task.isCompleted);
                }}
            />

            {onSetActive !== undefined && (
                <button className="task-set-active" onClick={() => onSetActive(task.id)}></button>
            )}

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
            
            <div className="task-time-logged">
                <input
                    type="number"
                    min={0} step={1}
                    className="task-hours-logged"
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
                    min={0} max={59} step={1}
                    className="task-minutes-logged"
                    value={Math.floor((task.secondsLogged % 3600) / 60)}
                    onChange={(e) => {
                        const minutes = Math.min(59, Math.max(0, parseInt(e.target.value) || 0));
                        const hours = Math.floor(task.secondsLogged / 3600);
                        onUpdate(task.id, 'secondsLogged', hours * 3600 + minutes * 60);
                    }}
                />
            </div>
            
            <button 
                className="task-delete accent-2"
                onClick={() => onDelete(task.id)}
            />
        </div>
    );
};

export default LongTask;