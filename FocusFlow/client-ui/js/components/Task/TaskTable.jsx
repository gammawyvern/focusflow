import React from 'react';

import TaskRow from './TaskRow';

const TaskTable = ({ tasks, onDeleteTask }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Information</th>
                    <th>Due Date</th>
                    <th>Time Logged</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(task => (
                    <TaskRow key={task.id} task={task} onDelete={onDeleteTask} />
                ))}
            </tbody>
        </table>
    )
}

export default TaskTable;