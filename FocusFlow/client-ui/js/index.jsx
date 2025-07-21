import React from 'react';
import { createRoot } from 'react-dom/client';

import TaskSummaryPanel from './components/TaskSummaryPanel';

console.log("This is a test");

const mounts = [
    { id: 'task-summary-component', component: <TaskSummaryPanel /> },
];

mounts.forEach(({ id, component }) => {
    const el = document.getElementById(id);
    if (el) {
        createRoot(el).render(component);
    }
});