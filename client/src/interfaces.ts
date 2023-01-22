export interface Phase {
    id: string;
    name: string;
    description: string | undefined;
    completed: boolean;
    tasks: Task[];
}


export interface Task {
    id: string;
    description: string;
    completed: boolean;
    phaseId: string;
    phase: Phase;
}
