
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