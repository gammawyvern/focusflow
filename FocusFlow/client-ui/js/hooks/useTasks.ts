import { useEffect, useState } from "react";

import { TaskDto } from "../types/task.dto";

export function useTasks() {
    const [tasks, setTasks] = useState<TaskDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const response = await fetch('/api/tasks');
                const tasks = await response.json();
                setTasks(tasks);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        loadTasks();
    }, []);

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

    return { tasks, setTasks, createTask, updateTask, deleteTask, isLoading };
}
