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

    "GET PHASE TASK BY ID"
    task(phaseId: ID!, id: ID!): Task

    "GET a random task"
    randomFact: RandomFact
  }

  type Mutation {
    markTaskAsComplete(taskId: ID!): TaskAndPhaseMutationResponse!

    markTaskAsIncomplete(taskId: ID!): TaskAndPhaseMutationResponse!

    addTaskToPhase(
      phaseId: ID!
      taskDescription: String!
    ): TaskAndPhaseMutationResponse!

    addPhase(name: String!, phaseDescription: String!): PhasesMutationResponse!

    deleteTask(phaseId: ID!, taskId: ID!): PhaseMutationResponse!

    deletePhase(phaseId: ID!): PhasesMutationResponse!
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

  type PhasesMutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    phases: [Phase!]
  }

  type MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
  }
`;

export default typeDefs;
