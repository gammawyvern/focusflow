import React, { useEffect, useState } from 'react';

import { TaskDto } from "../types/task.dto";

import TaskList from "./TaskList";

const TaskManager: React.FC = () => {
    const [tasks, setTasks] = useState<TaskDto[]>([]);
    
    useEffect(() => {
        fetch('/api/tasks')
            .then((res) => res.json())
            .then(setTasks)
            .catch((err) => {
                console.error('Failed to fetch tasks', err);
            })
    }, []);

    const handleTaskUpdate = (id: number, field: any, value: any) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, [field]: value } : task
            )
        );
    };


    return (
        <TaskList
            tasks={tasks}
            layout="long"
            onTaskUpdate={handleTaskUpdate}
        />
    )
}

export default TaskManager;