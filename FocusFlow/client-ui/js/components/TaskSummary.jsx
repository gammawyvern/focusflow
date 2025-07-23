import React, { useEffect, useState } from 'react';

const TaskSummary = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('/api/tasks')
            .then((res) => res.json())
            .then(setTasks)
            .catch((err) => {
                console.error('Failed to fetch tasks:', err);
            });
    }, []);
    
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
                    <div className="task-time">{task.secondsLogged}</div>
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