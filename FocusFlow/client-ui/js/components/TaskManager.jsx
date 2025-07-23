import React, {useEffect, useState} from 'react';

import TaskTable from './Task/TaskTable';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    
    useEffect(() => {
        fetch('/api/tasks')
            .then((res) => res.json())
            .then(setTasks)
            .catch((err) => {
                console.error('Failed to fetch tasks', err);
            })
    }, []);
    
    return (
        <TaskTable tasks={tasks} />
    )
}

export default TaskManager;