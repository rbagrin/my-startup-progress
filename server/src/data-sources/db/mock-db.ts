import  { ApolloError } from "apollo-server";

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

    async findTaskById(id: string): Promise<Task> {
        await sleep(50);
        return this.TASKS.find((task) => id === task.id);
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

        const phase = await this.setPhaseCompletionState(task.phaseId);

        return { task, phase };
    }

    private async setPhaseCompletionState(phaseId: string): Promise<Phase> {
        await sleep(50);
        const phase = this.PHASES.find((p) => p.id === phaseId);
        if (!phase) throw new ApolloError('Phase not found!', "404");

        const areAllPhaseTaskCompleted = !phase.tasks.some((task) => !task.completed);
        phase.completed = areAllPhaseTaskCompleted;
        
        return phase;
    }
}


