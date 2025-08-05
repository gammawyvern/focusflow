
export type TaskDto = {
    title: string,
    description: string,
    isCompleted: string,
    isActive: boolean,
    secondsLogged: number,
    dueDate: string,
    
    startedTime: string | null
}

export type TaskPatchDto = {
    title: string | null,
    description: string | null,
    dueDate: string | null,
    secondsLogged: number | null
}

export type TaskActiveDto = {
    active: boolean
}

export type TaskCompleteDto = {
    complete: boolean
}