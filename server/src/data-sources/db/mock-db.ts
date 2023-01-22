import  { ApolloError } from "apollo-server";
import { uuid } from "uuidv4";
import { Task, Phase } from "../../interfaces";
import { sleep } from "../../util/helpers";

export default class MockDB {
    private TASKS: Task[];
    private PHASES: Phase[];

    constructor() {
        const PHASE1: Phase = {
            id: 'p1',
            name: 'Phase 1',
            description: 'This is phase 1',
            completed: false,
            tasks: [],
        };
        const TASK1: Task = {
            id: 't1',
            description: 'aDSADa sd ad sa dsa dsafs bi',
            completed: true,
            phaseId: 'p1',
            phase: PHASE1,
        }
        const TASK2: Task = {
            id: 't2',
            description: 'dsiadiah dsa dad sa dsa dsa',
            completed: false,
            phaseId: 'p1',
            phase: PHASE1,
        }
        PHASE1.tasks = [TASK1, TASK2];

        this.PHASES = [PHASE1];
        this.TASKS = [TASK1, TASK2];
    }

    async findAllTasks(): Promise<Task[]> {
        await sleep(50);
        return this.TASKS;
    }

    async findPhaseTaskById(phaseId: string, taskId: string): Promise<Task> {
        await sleep(50);
        const phase = this.PHASES.find((phase) => phaseId === phase.id);
        if (!phase) throw new ApolloError('Phase not found!', "404");

        return phase.tasks.find((task) => taskId === task.id);
    };
    
    async findAllPhases(): Promise<Phase[]> {
        await sleep(50);
        return this.PHASES;
    };
    
    async findPhaseById(id: string): Promise<Phase> {
        await sleep(50);
        return this.PHASES.find((phase) => id === phase.id);
    };
    
    async findPhaseTasks(phaseId: string): Promise<Task[]> {
        await sleep(50);
        return this.PHASES.find((phase) => phase.id === phaseId)?.tasks;
    }
    
    async findTaskPhase(taskId: string): Promise<Phase> {
        await sleep(50);
        return this.TASKS.find((task) => task.id === taskId)?.phase;
    }

    async markTaskAsComplete(taskId: string): Promise<{ task: Task, phase: Phase }> {
        await sleep(50);
        const task = this.TASKS.find((t) => t.id === taskId);
        if (!task) throw new ApolloError('Phase not found!', "404");
        task.completed = true;

        const phase = this.PHASES.find((p) => p.id === task.phaseId);
        if (!phase) throw new ApolloError('Phase not found!', "404");

        this.setPhaseCompletionState(phase);

        return { task, phase };
    }

    async markTaskAsIncomplete(taskId: string): Promise<{ task: Task, phase: Phase }> {
        await sleep(50);
        const task = this.TASKS.find((t) => t.id === taskId);
        if (!task) throw new ApolloError('Phase not found!', "404");
        task.completed = false;

        const phase = this.PHASES.find((p) => p.id === task.phaseId);
        if (!phase) throw new ApolloError('Phase not found!', "404");

        this.setPhaseCompletionState(phase);

        return { task, phase };
    }

    async addTaskToPhase(phaseId: string, taskDescription: string): Promise<{ task: Task, phase: Phase }> {
        await sleep(50);
        const phase = this.PHASES.find((p) => p.id === phaseId);
        if (!phase) throw new ApolloError('Phase not found!', "404");

        const task: Task = {
            id: uuid(),
            description: taskDescription,
            completed: false,
            phaseId,
            phase
        };

        phase.tasks.push(task);
        this.TASKS.push(task);

        return { task, phase };
    }

    async addPhase(name: string, description: string): Promise<Phase> {
        await sleep(50);
        const phase: Phase = {
            id: uuid(),
            name,
            description,
            tasks: [],
            completed: false,
        };

        this.PHASES.push(phase);
        return phase;
    }

    async deletePhaseTask(phaseId: string, taskId: string): Promise<Phase> {
        await sleep(50);
        const phase = this.PHASES.find((p) => p.id === phaseId);
        if (!phase) throw new ApolloError('Phase not found!', "404");

        this.TASKS = this.TASKS.filter((t) => t.id !== taskId || t.phaseId !== phaseId);

        phase.tasks = phase.tasks.filter((t) => t.id !== taskId);

        this.setPhaseCompletionState(phase);

        return phase;
    }

    async deletePhase(phaseId: string): Promise<void> {
        await sleep(50);
        const phase = this.PHASES.find((p) => p.id === phaseId);
        if (!phase) throw new ApolloError('Phase not found!', "404");

        // Delete the task of the phase
        const phaseTasksIds = phase.tasks.map((task) => task.id);
        this.TASKS = this.TASKS.filter((task) => !phaseTasksIds.includes(task.id));

        // Delete the phase
        this.PHASES = this.PHASES.filter((phase) => phase.id !== phaseId);
    }

    private setPhaseCompletionState(phase: Phase): void {
        const tasksExistAndAllAreCompleted = phase.tasks.length > 0 && !phase.tasks.some((task) => !task.completed);
        phase.completed = tasksExistAndAllAreCompleted;
    }
}


