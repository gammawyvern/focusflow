import { TaskDto } from "../../types/task.dto";

export interface TaskProps {
    task: TaskDto;
    active: boolean;
    onUpdate: (id: number, field: any, value: any) => void;
    onDelete: (id: number) => void;
    onComplete?: (id: number) => void;
    onSetActive?: (id: number) => void;
}