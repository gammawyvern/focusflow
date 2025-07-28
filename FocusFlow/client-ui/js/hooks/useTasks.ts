import { useEffect, useState } from "react";

import { TaskDto } from "../types/task.dto";

export function useTasks() {
    const [tasks, setTasks] = useState<TaskDto[]>([]);

    useEffect(() => {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(setTasks)
            .catch(err => console.error('Failed to fetch tasks', err));
    }, []);

    useEffect(() => {
        const handleBeforeUnload = async () => {
            await fetch('/api/tasks/bulk', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tasks),
            });
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [tasks]);

    const createTask = async () => {
        const res = await fetch('/api/tasks', { method: 'POST' });
        if (res.ok) {
            const newTask = await res.json();
            setTasks(prev => [...prev, newTask]);
        }
    };

    const updateTask = (id: number, field: keyof TaskDto, value: any) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, [field]: value } : task
            )
        );
    };

    const deleteTask = async (id: number) => {
        await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    return { tasks, setTasks, createTask, updateTask, deleteTask };
}
