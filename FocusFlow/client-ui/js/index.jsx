import React from 'react';
import { createRoot } from 'react-dom/client';

import TaskSummaryPanel from './components/TaskSummaryPanel';
import TaskManagerPanel from './components/TaskManagerPanel';

const mounts = [
    { id: 'task-summary-component', component: <TaskSummaryPanel /> },
    { id: 'task-manager-component', component: <TaskManagerPanel /> }
];

mounts.forEach(({ id, component }) => {
    const el = document.getElementById(id);
    if (el) {
        createRoot(el).render(component);
    }
});