import React, {useEffect, useState} from 'react';

const TaskManager = () => {
    const [taskViews, setTaskViews] = useState([]);
    
    useEffect(() => {
        fetch('/api/tasks')
            .then((res) => res.json())
            .then(setTaskViews)
            .catch((err) => {
                console.error('Failed to fetch tasks', err);
            })
    }, []);
    
    return (
        <div style={{
            height: "100%",
            backgroundColor: "lightgray",
            color: "black"
        }}>
            Task Manager Placeholder
            {taskViews.map(task => (
                <div>{task.title}</div>
            ))}
        </div>
    )
}

export default TaskManager;