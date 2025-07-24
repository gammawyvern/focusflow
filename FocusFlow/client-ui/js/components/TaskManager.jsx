import React, {useEffect, useState} from 'react';

import TaskTable from './Task/TaskTable';
import { TaskModes } from "../constants/modes";

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [mode, setMode] = useState(TaskModes.VIEW);
    
    const handleTaskUpdate = (updatedTask) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
    };

    const handleTaskDelete = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    useEffect(() => {
        fetch('/api/tasks')
            .then((res) => res.json())
            .then(setTasks)
            .catch((err) => {
                console.error('Failed to fetch tasks', err);
            })
    }, []);
    
    return (
        <TaskTable
            tasks={tasks}
            onTaskUpdate={handleTaskUpdate}
            onTaskDelete={handleTaskDelete}
            mode={mode}
        />
    )
}

export default TaskManager;