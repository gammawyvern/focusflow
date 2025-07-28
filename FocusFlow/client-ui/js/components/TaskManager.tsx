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

    useEffect(() => {
        const handleBeforeUnload = async (e: any) => {
            await fetch('/api/tasks/bulk', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tasks),
            });
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [tasks]);

    const handleTaskCreate = async () => {
        const res = await fetch('/api/tasks', {
            method: 'POST',
        });

        if (res.ok) {
            const newTask = await res.json();
            setTasks(prev => [...prev, newTask]);
        }
    };

    const handleTaskUpdate = (id: number, field: any, value: any): void => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, [field]: value } : task
            )
        );
    };

    const handleTaskDelete = async (id: number) => {
        await fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        });

        setTasks(prev => prev.filter(task => task.id !== id));
    };

    return (
        <>
            <TaskList
                tasks={tasks}
                layout="long"
                onTaskCreate={handleTaskCreate}
                onTaskUpdate={handleTaskUpdate}
                onTaskDelete={handleTaskDelete}
            />
        </>
    )
}

export default TaskManager;