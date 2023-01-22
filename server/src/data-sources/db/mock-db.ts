import  { ApolloError } from "apollo-server";
import { v4 as uuid_v4 } from "uuid";
import { Task, Phase } from "../../interfaces";
import { sleep } from "../../util/helpers";

export default class MockDB {
    private TASKS: Task[];
    private PHASES: Phase[];

    constructor() {
        const PHASE1: Phase = {
            id: uuid_v4(),
            name: 'Foundation',
            description: 'This is the foundation of the startup',
            completed: false,
            tasks: [],
        };
        const PHASE2: Phase = {
            id: uuid_v4(),
            name: 'Discovery',
            description: 'This is the discovery part of the startup',
            completed: false,
            tasks: [],
        };
        const TASK1: Task = {
            id: uuid_v4(),
            description: 'Set up virtual office',
            completed: true,
            phaseId: PHASE1.id,
            phase: PHASE1,
        }
        const TASK2: Task = {
            id: uuid_v4(),
            description: 'Set mission & vision',
            completed: false,
            phaseId: PHASE1.id,
            phase: PHASE1,
        }
        const TASK3: Task = {
            id: uuid_v4(),
            description: 'Create roadmap',
            completed: true,
            phaseId: PHASE2.id,
            phase: PHASE2,
        }
        const TASK4: Task = {
            id: uuid_v4(),
            description: 'Competitor analysis',
            completed: false,
            phaseId: PHASE2.id,
            phase: PHASE2,
        }
        PHASE1.tasks = [TASK1, TASK2];
        PHASE2.tasks = [TASK3, TASK4];

        this.PHASES = [PHASE1, PHASE2];
        this.TASKS = [TASK1, TASK2, TASK3, TASK4];
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

        this.validateEntirePhaseList();

        return { task, phase };
    }

    async addTaskToPhase(phaseId: string, taskDescription: string): Promise<{ task: Task, phase: Phase }> {
        await sleep(50);
        const phase = this.PHASES.find((p) => p.id === phaseId);
        if (!phase) throw new ApolloError('Phase not found!', "404");

        const task: Task = {
            id: uuid_v4(),
            description: taskDescription,
            completed: false,
            phaseId,
            phase
        };
        
        phase.tasks.push(task);
        this.TASKS.push(task);

        this.setPhaseCompletionState(phase);
        this.validateEntirePhaseList();

        return { task, phase };
    }

    async addPhase(name: string, description: string): Promise<Phase[]> {
        await sleep(50);
        const phase: Phase = {
            id: uuid_v4(),
            name,
            description,
            tasks: [],
            completed: false,
        };

        this.PHASES.push(phase);
        return this.PHASES;
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

    async deletePhase(phaseId: string): Promise<Phase[]> {
        await sleep(50);
        const phase = this.PHASES.find((p) => p.id === phaseId);
        if (!phase) throw new ApolloError('Phase not found!', "404");

        // Delete the task of the phase
        const phaseTasksIds = phase.tasks.map((task) => task.id);
        this.TASKS = this.TASKS.filter((task) => !phaseTasksIds.includes(task.id));

        // Delete the phase
        this.PHASES = this.PHASES.filter((phase) => phase.id !== phaseId);

        return this.PHASES;
    }

    private setPhaseCompletionState(phase: Phase): void {
        const tasksExistAndAllAreCompleted = phase.tasks.length > 0 && !phase.tasks.some((task) => !task.completed);
        phase.completed = tasksExistAndAllAreCompleted;
    }

    private validateEntirePhaseList(): void {
        let foundFirstIncompleteList = false;

        for (let i = 0; i < this.PHASES.length; i+=1) {
            // If previously found a incomplete phase mark all the next phases and their tasks as incomplete
            console.log(`START: i = ${i}, foundFirst = ${foundFirstIncompleteList}, phaseStatus=${this.PHASES[i].completed}`);
            
            if (foundFirstIncompleteList) {
                console.log("MARK phase i as not complete");
                
                this.PHASES[i].completed = false;
                for (let j = 0; j < this.PHASES[i].tasks.length; j += 1) {
                    console.log(`mark task ${j} of phase ${i} as not complete`);
                    this.PHASES[i].tasks[j].completed = false;
                }
            }

            // If the first incomplete phase was found or the current phase is incomplete mark foundFirstIncompleteList = true
            foundFirstIncompleteList = foundFirstIncompleteList || !this.PHASES[i].completed; //tasks.some((task) => !task.completed);

            console.log(`END: i = ${i}, foundFirst = ${foundFirstIncompleteList}`);
        }
    } 
}


