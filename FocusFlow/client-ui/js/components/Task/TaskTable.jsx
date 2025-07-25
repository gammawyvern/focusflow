import React from 'react';

import TaskRow from './TaskRow';

const TaskTable = ({ tasks, onTaskUpdate, onTaskDelete }) => {
    return (
        <table className="task-table">
            <thead className="task-table-header">
                <tr>
                    <th>Status</th>
                    <th>Information</th>
                    <th>Due Date</th>
                    <th>Time Logged</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className="task-table-body">
                {tasks.map(task => (
                    <TaskRow
                        key={task.id}
                        task={task}
                        onUpdate={onTaskUpdate}
                        onDelete={onTaskDelete}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default TaskTable;