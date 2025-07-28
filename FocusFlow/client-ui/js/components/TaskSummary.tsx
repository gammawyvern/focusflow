import React, {useEffect, useState, useMemo, act} from 'react';

import { TaskDto } from "../types/task.dto";

import TaskList from "./TaskList";

const TaskSummary: React.FC = () => {
    const [tasks, setTasks] = useState<TaskDto[]>([]);
    const [activeTaskId, setActiveTaskId] = useState<number | undefined>(undefined);

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
    
    const handleSetTaskActive = (id: number) => {
        if (activeTaskId && activeTaskId == id) {
            setActiveTaskId(undefined);
        } else {
            setActiveTaskId(id);
        }
        
        /* Will be more complex with timer. */
    }
    
    const handleTaskComplete = (id: number) => {
        if (id == activeTaskId) setActiveTaskId(undefined);
    }


    const sortedTasks = useMemo(() => {
        const today = new Date().toISOString().slice(0, 10);
        
        return tasks
            .filter(t => t.dueDate === today)
            .sort((a, b) => {
                if (activeTaskId !== undefined) {
                    if (a.id === activeTaskId) return -1;
                    if (b.id === activeTaskId) return 1;
                }
                return Number(a.isCompleted) - Number(b.isCompleted);
            });
    }, [tasks, activeTaskId]);

    return (
        <>
            <TaskList
                tasks={sortedTasks}
                activeTaskId={activeTaskId}
                layout="long"
                onTaskCreate={handleTaskCreate}
                onTaskUpdate={handleTaskUpdate}
                onTaskDelete={handleTaskDelete}
                onTaskComplete={handleTaskComplete}
                onSetTaskActive={handleSetTaskActive}
            />
        </>
    )
}

export default TaskSummary;