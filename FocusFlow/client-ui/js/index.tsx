import React from 'react';
import { createRoot } from 'react-dom/client';

import TaskSummary from './components/TaskSummary';
import TaskManager from './components/TaskManager';

/* Mounting React Components. */

const mounts: any[] = [
    
];

mounts.forEach(({ id, component }) => {
    const el = document.getElementById(id);
    if (el) {
        createRoot(el).render(component);
    }
});

/* Small code chunks for Views. */

import './components/PomodoroTimer';
import './components/Task/Task';
import './components/DateFilter'