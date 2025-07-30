import React from 'react';
import { createRoot } from 'react-dom/client';

import TaskSummary from './components/TaskSummary';
import TaskManager from './components/TaskManager';

import './components/PomodoroTimer';

const mounts = [
    { id: 'task-summary-component', component: <TaskSummary /> },
    { id: 'task-manager-component', component: <TaskManager /> }
];

mounts.forEach(({ id, component }) => {
    const el = document.getElementById(id);
    if (el) {
        createRoot(el).render(component);
    }
});