import React from 'react';

import { TaskLayoutType, taskLayouts } from "./Task/taskLayouts";

import { TaskDto } from "../types/task.dto";

interface TaskListProps {
    tasks: TaskDto[];
    layout: TaskLayoutType;
    onTaskCreate: (task: TaskDto) => void;
    onTaskUpdate: (id: number, field: any, value: any) => void;
    onTaskDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, layout, onTaskCreate, onTaskUpdate, onTaskDelete }: TaskListProps) => {
    const TaskComponent = taskLayouts[layout];
    
    return (
        <div className="task-list">
            {tasks.map((task) => (
                <>
                    <TaskComponent
                        key={task.id}
                        task={task}
                        onUpdate={onTaskUpdate}
                        onDelete={onTaskDelete}
                    />
                </>
            ))}
        </div>
    )
}

export default TaskList;