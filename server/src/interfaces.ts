export interface Phase {
    id: string;
    name: string;
    description: string | undefined;
    tasks: Task[];
    completed: boolean;
}

export interface Task {
    id: string;
    description: string;
    completed: boolean;
    phaseId: string;
    phase: Phase;
}