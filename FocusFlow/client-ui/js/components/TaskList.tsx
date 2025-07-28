import React from 'react';

import { TaskLayoutType, taskLayouts } from "./Task/taskLayouts";

import { TaskDto } from "../types/task.dto";

interface TaskListProps {
    tasks: TaskDto[];
    activeTaskId?: number;
    layout: TaskLayoutType;
    onTaskCreate: () => void;
    onTaskUpdate: (id: number, field: any, value: any) => void;
    onTaskDelete: (id: number) => void;
    onTaskComplete?: (id: number) => void;
    onSetTaskActive?: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, activeTaskId, layout, onTaskCreate, onTaskUpdate, onTaskDelete, onTaskComplete, onSetTaskActive }: TaskListProps) => {
    const TaskComponent = taskLayouts[layout];
    
    return (
        <div className="task-list">
            {tasks.map((task) => (
                <>
                    <TaskComponent
                        key={task.id}
                        task={task}
                        active={activeTaskId === task.id}
                        onUpdate={onTaskUpdate}
                        onDelete={onTaskDelete}
                        onComplete={onTaskComplete}
                        onSetActive={task.isCompleted ? undefined : onSetTaskActive}
                    />
                </>
            ))}
            
            <button
                key={-1}
                className="task-create"
                onClick={() => {onTaskCreate()}}
            >
                New Task
            </button>
        </div>
    )
}

export default TaskList;