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

    const handleTaskUpdate = (updatedTask: TaskDto) => {
        setTasks(tasks =>
            tasks.map(task => task.id === updatedTask.id ? updatedTask : task)
        );
    };

    return (
        <TaskList
            tasks={tasks}
            layout="long"
            onUpdate={handleTaskUpdate}
        />
    )
}

export default TaskManager;