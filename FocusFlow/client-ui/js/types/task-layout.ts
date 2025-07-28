import { TaskDto } from "./task.dto";

export type TaskLayoutType = 'compact' | 'long';

export interface TaskRendererProps {
    task: TaskDto;
}
