import React, {useEffect, useState} from 'react';

import TaskTable from './Task/TaskTable';
import { TaskModes } from "../constants/modes";

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [mode, setMode] = useState(TaskModes.VIEW);

    useEffect(() => {
        fetch('/api/tasks')
            .then((res) => res.json())
            .then(setTasks)
            .catch((err) => {
                console.error('Failed to fetch tasks', err);
            })
    }, []);
    
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
    
    return (
        <>
            {mode === TaskModes.VIEW ? (
                <div>
                    <button onClick={() => setMode(TaskModes.EDIT)} className="accent-3">Edit Mode</button>
                    <button onClick={() => setMode(TaskModes.DELETE)} className="accent-2">Delete Mode</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => setMode(TaskModes.VIEW)} className="accent-1">Confirm</button>
                    <button onClick={() => setMode(TaskModes.VIEW)} className="accent-2">Cancel</button>
                </div>
            )} 
            
            <TaskTable
                tasks={tasks}
                onTaskUpdate={handleTaskUpdate}
                onTaskDelete={handleTaskDelete}
                mode={mode}
            />
        </>
    )
}

export default TaskManager;