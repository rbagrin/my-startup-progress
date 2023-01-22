import { gql } from "@apollo/client";

export default class Mutations {
    public static MARK_TASK_AS_COMPLETED = gql`
        mutation MarkTaskAsComplete($taskId: ID!) {
            markTaskAsComplete(taskId: $taskId) {
                code
                success
                message
                task {
                    id
                    description
                    completed
                }
                phase {
                    id
                    name
                    description
                    completed
                }
            }
        }
    `

    public static MARK_TASK_AS_INCOMPLETE = gql`
        mutation MarkTaskAsIncomplete($taskId: ID!) {
            markTaskAsIncomplete(taskId: $taskId) {
                code
                success
                message
                task {
                    id
                    description
                    completed
                }
                phase {
                    id
                    name
                    description
                    completed
                    tasks {
                        id
                        description
                        completed
                    }
                }
            }
        }
    `

    public static ADD_TASK_TO_PHASE = gql`
        mutation AddTaskToPhase($phaseId: ID!, $taskDescription: String!) {
            addTaskToPhase(phaseId: $phaseId, taskDescription: $taskDescription) {
                code
                success
                message
                phase {
                    id
                    name
                    description
                    tasks {
                        id
                        description
                        completed
                    }
                    completed
                }
            }
        }
    `;

    public static ADD_PHASE = gql`
        mutation AddPhase($name: String!, $phaseDescription: String!) {
            addPhase(name: $name, phaseDescription: $phaseDescription) {
                code
                success
                message
                phase {
                    id
                    completed
                    description
                    name
                    tasks {
                        id
                        description
                        completed
                    }
                }
            }
        }
    `;

    public static DELETE_PHASE_TASK_BY_ID = gql`
        mutation Mutation($phaseId: ID!, $taskId: ID!) {
            deleteTask(phaseId: $phaseId, taskId: $taskId) {
                code
                success
                message
                phase {
                    id
                    name
                    description
                    completed
                    tasks {
                        id
                        description
                        completed
                    }
                }
            }
        }
    `;

    public static DELETE_PHASE_BY_ID = gql`
        mutation Mutation($phaseId: ID!) {
            deletePhase(phaseId: $phaseId) {
                code
                success
                message
            }
        }
    `;
}
