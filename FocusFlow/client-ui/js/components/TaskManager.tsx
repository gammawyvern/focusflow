import React, { useEffect, useState } from 'react';

import { TaskDto } from "../types/task.dto";

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
    
    return (
        <TaskManager />
    )
}

export default TaskManager;