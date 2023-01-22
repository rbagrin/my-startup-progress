import { ApolloError } from "apollo-server";
import { RandomFact } from "./data-sources/api/uselessfacts.interface";
import { MyDataSources } from "./data-sources/data-sources.interfaces";
import { Phase, PhaseMutationResponse, PhasesMutationResponse, Task, TaskAndPhaseMutationResponse } from "./interfaces";

interface ResolverContext {
    dataSources: MyDataSources,
};

export const resolvers = {
    Phase: {
        tasks(phase: Phase, _: null, { dataSources }: ResolverContext) {
            try {
                return dataSources.mockDB.findPhaseTasks(phase.id);
            } catch(error) {
                throw new ApolloError(error);
            }
        }
    },
    Task: {
        phase(task: Task, _: null, { dataSources }: ResolverContext) {
            try {
                return dataSources.mockDB.findTaskPhase(task.id);
            } catch(error) {
                throw new ApolloError(error);
            }
        }
    },
    Query: {
        async phases(_: null, __: null, { dataSources }: ResolverContext): Promise<Phase[]> {
            try {
                return dataSources.mockDB.findAllPhases();
            } catch(error) {
                throw new ApolloError(error);
            }
        },
        async phase(_: null, args: { id: string }, { dataSources }: ResolverContext): Promise<Phase> {
            return dataSources.mockDB.findPhaseById(args.id)
        },
        async task(_: null, args: { phaseId: string, id: string }, { dataSources }: ResolverContext): Promise<Task> {
            return dataSources.mockDB.findPhaseTaskById(args.phaseId, args.id);
        },
        async randomFact(_: null, __: null, { dataSources }: ResolverContext): Promise<RandomFact> {
            return dataSources.uselessFactsAPI.getRandomFact();
        },
    },
    Mutation: {
        async markTaskAsComplete(_: null, args: { taskId: string }, { dataSources }: ResolverContext): Promise<TaskAndPhaseMutationResponse> {
            try {
                const { task, phase } = await dataSources.mockDB.markTaskAsComplete(args.taskId);

                return {
                    code: 200,
                    success: true,
                    message: `Successfully marked task with taskId = ${args.taskId} as completed.`,
                    task,
                    phase,
                }
            } catch(error) {
                return {
                    code: error.extensions.response.status,
                    success: false,
                    message: error.extensions.response.body,
                    task: null,
                    phase: null,
                }
            }
        },
        async markTaskAsIncomplete(_: null, args: { taskId: string }, { dataSources }: ResolverContext): Promise<TaskAndPhaseMutationResponse> {
            try {
                const { task, phase } = await dataSources.mockDB.markTaskAsIncomplete(args.taskId);

                return {
                    code: 200,
                    success: true,
                    message: `Successfully marked task with taskId = ${args.taskId} as incomplete.`,
                    task,
                    phase,
                }
            } catch(error) {
                return {
                    code: error.extensions.response.status,
                    success: false,
                    message: error.extensions.response.body,
                    task: null,
                    phase: null,
                }
            }
        },
        async addTaskToPhase(_: null, args: { phaseId: string, taskDescription: string }, { dataSources }: ResolverContext): Promise<TaskAndPhaseMutationResponse> {
           try {            
                const { task, phase } = await dataSources.mockDB.addTaskToPhase(args.phaseId, args.taskDescription);
                return {
                    code: 200,
                    success: true,
                    message: "Task added successfully",
                    task,
                    phase
                };
           } catch(error) {
                return {
                    code: error.extensions.response.status,
                    success: false,
                    message: error.extensions.response.body,
                    task: null,
                    phase: null,
                };
           }
        },
        async addPhase(_: null, args: { name: string, phaseDescription: string}, { dataSources }: ResolverContext): Promise<PhasesMutationResponse> {
            try {
                const phases = await dataSources.mockDB.addPhase(args.name, args.phaseDescription);
                return {
                    code: 200,
                    success: true,
                    message: "Task successfully added",
                    phases
                };
            } catch(error) {
                return {
                    code: error.extensions.response.status,
                    success: false,
                    message: error.extensions.response.body,
                    phases: null,
                };
            }
        } ,
        async deleteTask(_: null, args: { phaseId: string, taskId: string }, { dataSources }: ResolverContext): Promise<PhaseMutationResponse> {
            try {
                const phase = await dataSources.mockDB.deletePhaseTask(args.phaseId, args.taskId);
                return {
                    code: 200,
                    success: true,
                    message: "Task successfully deleted",
                    phase
                };
            } catch(error) {
                return {
                    code: error.extensions.response.status,
                    success: false,
                    message: error.extensions.response.body,
                    phase: null,
                };
            }
        },
        async deletePhase(_: null, args: { phaseId: string }, { dataSources }: ResolverContext): Promise<PhasesMutationResponse> {
            try {
                const phases = await dataSources.mockDB.deletePhase(args.phaseId);
                return {
                    code: 200,
                    success: true,
                    message: "Phase successfully deleted",
                    phases,
                };
            } catch(error) {
                return {
                    code: error.extensions.response.status,
                    success: false,
                    message: error.extensions.response.body,
                    phases: null,
                };
            }
        }
    }
};