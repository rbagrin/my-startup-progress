import { gql } from "@apollo/client";

export const GET_PHASES = gql`
    query Query {
        phases {
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
`;

export const GET_PHASE_BY_ID = gql`
    query GetPhase($phaseId: ID!) {
        phase(id: $phaseId) {
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
`

export const GET_RANDOM_FACT_ON_PHASE_COMPLETION = gql`
query Query {
    getRandomFact {
            id
            text
            source
            source_url
            language
            permalink
        }
    }
`
export const MARK_TASK_AS_COMPLETED = gql`
    mutation MarkTaskAsComplete($taskId: ID!) {
        markTaskAsComplete(taskId: $taskId) {
            code
            success
            message
            task {
                completed
            }
            phase {
                id
                completed
            }
        }
    }
`