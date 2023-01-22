import { ApolloError } from "apollo-server";
import { RandomFact } from "./data-sources/api/uselessfacts.interface";
import { MyDataSources } from "./data-sources/data-sources.interfaces";
import { Phase, Task } from "./interfaces";

interface ResolverContext {
    dataSources: MyDataSources,
};

export const resolvers = {
    Phase: {
        tasks(phase: Phase, _: any, { dataSources }: ResolverContext) {
            try {
                return dataSources.mockDB.findPhaseTasks(phase.id);
            } catch(error) {
                throw new ApolloError(error);
            }
        }
    },
    Task: {
        phase(task: Task, _: any, { dataSources }: ResolverContext) {
            try {
                return dataSources.mockDB.findTaskPhase(task.id);
            } catch(error) {
                throw new ApolloError(error);
            }
        }
    },
    Query: {
        async phases(_: any, __: any, { dataSources }: ResolverContext): Promise<Phase[]> {
            try {
                return dataSources.mockDB.findAllPhases();
            } catch(error) {
                throw new ApolloError(error);
            }
        },
        async phase(_: any, args: { id: string }, { dataSources }: ResolverContext): Promise<Phase> {
            return dataSources.mockDB.findPhaseById(args.id)
        },
        async task(_: any, args: { id: string }, { dataSources }: ResolverContext): Promise<Task> {
            return dataSources.mockDB.findTaskById(args.id);
        },
        async getRandomFact(_: any, __: any, { dataSources }: ResolverContext): Promise<RandomFact> {
            return dataSources.uselessFactsAPI.getRandomFact();
        },
    },
    Mutation: {
        async markTaskAsComplete(_: any, args: { taskId: string }, { dataSources }: ResolverContext): Promise<any> {
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
        async addTaskToPhase(_: any, args: { phaseId: string, taskDescription: string }, { dataSources }: ResolverContext): Promise<any> {
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
        async addPhase(_: any, args: { name: string, phaseDescription: string}, { dataSources }: ResolverContext): Promise<any> {
            try {
                const phase = await dataSources.mockDB.addPhase(args.name, args.phaseDescription);
                return {
                    code: 200,
                    success: true,
                    message: "Task added successfully",
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
        } 
    }
};