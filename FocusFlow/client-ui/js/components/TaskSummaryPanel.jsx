import React, { useEffect, useState } from 'react';

const TaskSummaryPanel = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('/api/TaskApi')
            .then((res) => res.json())
            .then(setTasks)
            .catch((err) => {
                console.error('Failed to fetch tasks:', err);
            });
    }, []);
    
    return (
        <div className="card" style={{ minHeight: '100%' }}>
            <h2 className="dashboard-task-header">Today's Tasks</h2>
            {tasks.map((task) => (
                <a
                    key={task.id}
                    className="task"
                    data-active={task.isActive?.toString()}
                >
                    <div className="task-complete">O</div>
                    <div className="task-title">{task.title}</div>
                    <div className="task-description">{task.description}</div>
                    <div className="task-time">{task.timeLoggedString}</div>
                    {task.isActive && (
                        <img
                            className="task-active"
                            src="assets/progressBar.png"
                            alt="Active Task Icon"
                        />
                    )}
                </a>
            ))}
        </div>
    );
};

export default TaskSummaryPanel;