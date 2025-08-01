import { createRoot } from 'react-dom/client';

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
import './components/TaskManager'
import './components/CompleteToggle';