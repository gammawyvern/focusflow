import { TaskDto } from "./task.dto";

export type TaskLayoutType = 'compact';

export interface TaskRendererProps {
    task: TaskDto;
}
