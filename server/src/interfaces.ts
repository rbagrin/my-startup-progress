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

export interface MutationResponse {
    code: number;
    success: boolean;
    message: string;
}

export interface TaskAndPhaseMutationResponse extends MutationResponse {
    task: Task | null;
    phase: Phase | null;
}

export interface PhaseMutationResponse extends MutationResponse {
    phase: Phase | null;
}

export interface PhasesMutationResponse extends MutationResponse {
    phases: Phase[] | null;
}

