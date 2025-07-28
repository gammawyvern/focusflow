import React from 'react';

import CompactTask from './CompactTask';
import LongTask from "./LongTask";

import { TaskRendererProps, TaskLayoutType } from "../../types/task-layout";

export const taskLayouts: Record<TaskLayoutType, React.ComponentType<TaskRendererProps>> = {
    compact: CompactTask,
    long: LongTask
};