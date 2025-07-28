import React from "react";

import { TaskProps } from "./taskProps";

import CompactTask from "./CompactTask";
import LongTask from "./LongTask";

export type TaskLayoutType = 'compact' | 'long';

export const taskLayouts: Record<TaskLayoutType, React.ComponentType<TaskProps>> = {
    compact: CompactTask,
    long: LongTask
};