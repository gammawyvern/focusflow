import React from 'react';

import { TaskProps } from "./taskProps";

const CompactTask: React.FC<TaskProps> = ({ task, onUpdate }: TaskProps) => {
    return (
        <div className="task compact-task">
            <span>{task.isCompleted ? "Complete" : "Incomplete" }</span>
            <span>{task.title}</span>
            <span>{task.description}</span>
            <span>{task.dueDate}</span>
            <span>{task.secondsLogged}</span>
        </div>
    )
}

export default CompactTask;