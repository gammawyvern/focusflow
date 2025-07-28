import { TaskDto } from "../../types/task.dto";

export interface TaskProps {
    task: TaskDto;
    onUpdate: (id: number, field: any, value: any) => void;
    onDelete: (id: number) => void;
}