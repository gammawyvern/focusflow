import React, { useEffect, useState, useMemo } from 'react';

import TaskTable from './Task/TaskTable';
import { TaskModes } from "../constants/modes";
import Loading from "../components/Loading";

const TaskManager = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [mode, setMode] = useState(TaskModes.EDIT);

    const sortedTasks = useMemo(() => (
        tasks.slice().sort((a, b) => a.isCompleted - b.isCompleted)
    ), [tasks]);

    useEffect(() => {
        fetch('/api/tasks')
            .then((res) => res.json())
            .then(setTasks)
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        const handleBeforeUnload = async (e) => {
            await fetch('/api/tasks/bulk', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tasks),
            });
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [tasks]);

    const handleTaskUpdate = (id, field, value) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, [field]: value } : task
            )
        );
    };

    const handleTaskCreate = async () => {
        const res = await fetch('/api/tasks', {
            method: 'POST',
        });

        if (res.ok) {
            const newTask = await res.json();
            setTasks(prev => [...prev, newTask]);
        }
    };

    const handleTaskDelete = async (id) => {
        await fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        });
        
        setTasks(prev => prev.filter(task => task.id !== id));
    };
    
    if (isLoading) {
        return <Loading />;
    }
    
    return (
        <>
            {mode === TaskModes.DELETE ? (
                <div>
                    <button onClick={() => setMode(TaskModes.EDIT)} className="accent-1">Confirm</button>
                    <button onClick={() => setMode(TaskModes.EDIT)} className="accent-2">Cancel</button>
                </div>
            ) : (
                <div>
                    <button onClick={handleTaskCreate} className="accent-3">Create Task</button>
                    {/* <button onClick={() => setMode(TaskModes.DELETE)} className="accent-2">Delete Mode</button> */}
                </div>
            )} 
            
            <TaskTable
                tasks={sortedTasks}
                onTaskUpdate={handleTaskUpdate}
                onTaskDelete={handleTaskDelete}
            />
        </>
    );
}

export default TaskManager;