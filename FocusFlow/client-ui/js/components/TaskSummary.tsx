import React, { useMemo, useState} from 'react';

import { useTasks } from "../hooks/useTasks";

import TaskList from "./TaskList";
import Loading from "./Loading";

const TaskSummary: React.FC = () => {
    const { tasks, setTasks, createTask, updateTask, deleteTask, isLoading } = useTasks();
    
    const [activeTaskId, setActiveTaskId] = useState<number | undefined>(undefined);

    const handleSetTaskActive = (id: number) => {
        if (activeTaskId && activeTaskId == id) {
            setActiveTaskId(undefined);
        } else {
            setActiveTaskId(id);
        }
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
    
    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <TaskList
                tasks={sortedTasks}
                activeTaskId={activeTaskId}
                layout="long"
                onTaskCreate={createTask}
                onTaskUpdate={updateTask}
                onTaskDelete={deleteTask}
                onTaskComplete={handleTaskComplete}
                onSetTaskActive={handleSetTaskActive}
            />
        </>
    )
}

export default TaskSummary;