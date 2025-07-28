import React, { useEffect, useMemo, useState } from 'react';

import { TaskDto } from "../types/task.dto";

import TaskList from "./TaskList";
import {useTasks} from "../hooks/useTasks";

const TaskManager: React.FC = () => {
    const { tasks, setTasks, createTask, updateTask, deleteTask } = useTasks();

    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => {
            return Number(a.isCompleted) - Number(b.isCompleted);
        });
    }, [tasks]);

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