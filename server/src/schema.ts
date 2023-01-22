import { gql } from "apollo-server";

const typeDefs = gql`
    "A Task is a requirement the startup must to complete in a Phase"
    type Task {
        id: ID!
        description: String!
        completed: Boolean!
        phaseId: String!
        phase: Phase!
    }

    "A Phase is a group of Tasks that becomes completed only if all its tasks are completed"
    type Phase {
        id: ID!
        name: String!
        description: String
        tasks: [Task!]
        completed: Boolean!
    }

    type RandomFact {
        id: String
        text: String
        source: String
        source_url: String
        language: String
        permalink: String
    }

    type Query {
        "GET phase by id"
        phase(id: ID!): Phase

        "GET all phases"
        phases: [Phase!]!

        "GET TASK BY ID"
        task(id: String!): Task

        "GET a random task"
        getRandomFact: RandomFact
    }

    type Mutation {
        markTaskAsComplete(taskId: ID!): TaskAndPhaseMutationResponse!

        addTaskToPhase(phaseId: ID!, taskDescription: String!): TaskAndPhaseMutationResponse!

        addPhase(name: String!, phaseDescription: String!): PhaseMutationResponse! 
    }

    type TaskAndPhaseMutationResponse {
        code: Int!
        success: Boolean!
        message: String!
        task: Task
        phase: Phase
    }

    type PhaseMutationResponse {
        code: Int!
        success: Boolean!
        message: String!
        phase: Phase
    }
`;

export default typeDefs;
