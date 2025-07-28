import React, { useMemo } from 'react';

import TaskList from "./TaskList";
import Loading from "./Loading";

import { useTasks } from "../hooks/useTasks";

const TaskManager: React.FC = () => {
    const { tasks, setTasks, createTask, updateTask, deleteTask, isLoading } = useTasks();

    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => {
            return Number(a.isCompleted) - Number(b.isCompleted);
        });
    }, [tasks]);
    
    if (isLoading) {
        return <Loading />;
    }

    return (
        <TaskList
            tasks={sortedTasks}
            layout="long"
            onTaskCreate={createTask}
            onTaskUpdate={updateTask}
            onTaskDelete={deleteTask}
        />
    )
}

export default TaskManager;