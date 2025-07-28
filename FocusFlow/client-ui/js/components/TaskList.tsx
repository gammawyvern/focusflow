import React from 'react';

import { taskLayouts } from "./Task/taskLayouts";

import { TaskDto } from "../types/task.dto";
import { TaskLayoutType } from "../types/task-layout";

interface TaskListProps {
    tasks: TaskDto[];
    layout: TaskLayoutType;
    onUpdate: (task: TaskDto) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, layout, onUpdate }: TaskListProps) => {
    const TaskComponent = taskLayouts[layout];
    
    return (
        <div className="task-list">
            {tasks.map((task) => (
                <>
                    <TaskComponent
                        key={task.id}
                        task={task}
                        onUpdate={onUpdate}
                    />
                </>
            ))}
        </div>
    )
}

export default TaskList;