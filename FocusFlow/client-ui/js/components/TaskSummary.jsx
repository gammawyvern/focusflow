import React, { useEffect, useState } from 'react';

import { formatSeconds } from "../utils/taskFormatters";

import Loading from "./Loading";

const TaskSummary = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('/api/tasks')
            .then((res) => res.json())
            .then(setTasks)
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false));
    }, []);
    
    if (isLoading) {
        return <Loading />;
    }
    
    return (
        <>
            {tasks.map((task) => (
                <a
                    key={task.id}
                    className="task"
                    data-active={false}
                >
                    <div className="task-complete">O</div>
                    <div className="task-title">{task.title}</div>
                    <div className="task-description">{task.description}</div>
                    <div className="task-time">{formatSeconds(task.secondsLogged)}</div>
                    {task.isActive && (
                        <img
                            className="task-active"
                            src="assets/progressBar.png"
                            alt="Active Task Icon"
                        />
                    )}
                </a>
            ))}
        </>
    );
};

export default TaskSummary;