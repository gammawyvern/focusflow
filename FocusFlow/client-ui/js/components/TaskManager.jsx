import React, {useEffect, useState} from 'react';

import TaskTable from './Task/TaskTable';
import { TaskModes } from "../constants/modes";

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [mode, setMode] = useState(TaskModes.VIEW);

    const handleDeleteTask = (id) => {
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
            onDeleteTask={handleDeleteTask}
            mode={mode}
        />
    )
}

export default TaskManager;