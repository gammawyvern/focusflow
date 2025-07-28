import React from 'react';

import { TaskLayoutType, taskLayouts } from "./Task/taskLayouts";

import { TaskDto } from "../types/task.dto";

interface TaskListProps {
    tasks: TaskDto[];
    layout: TaskLayoutType;
    onTaskUpdate: (id: number, field: any, value: any) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, layout, onTaskUpdate }: TaskListProps) => {
    const TaskComponent = taskLayouts[layout];
    
    return (
        <div className="task-list">
            {tasks.map((task) => (
                <>
                    <TaskComponent
                        key={task.id}
                        task={task}
                        onUpdate={onTaskUpdate}
                    />
                </>
            ))}
        </div>
    )
}

export default TaskList;