import React from 'react';
import { createRoot } from 'react-dom/client';

const mounts = [
    
];

mounts.forEach(({ id, component }) => {
    const el = document.getElementById(id);
    if (el) {
        createRoot(el).render(component);
    }
});