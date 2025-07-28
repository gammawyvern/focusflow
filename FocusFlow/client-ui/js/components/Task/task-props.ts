import {TaskDto} from "../../types/task.dto";

export interface TaskProps {
    task: TaskDto,
    onUpdate: (task: TaskDto) => void;
}
