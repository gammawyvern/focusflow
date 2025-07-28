import CompactTask from './CompactTask';

import { TaskRendererProps, TaskLayoutType } from "../../types/task-layout";

export const taskLayouts: Record<TaskLayoutType, React.ComponentType<TaskRendererProps>> = {
    compact: CompactTask,
};