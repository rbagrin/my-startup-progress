import { gql } from "@apollo/client";


export default class Queries {
    public static GET_PHASES = gql`
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

    public static GET_PHASE_BY_ID = gql`
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

    public static GET_TASK_BY_ID = gql`
        query Query($taskId: String!) {
            task(id: $taskId) {
                id
                description
                completed
                phaseId
                phase {
                    id
                    name
                    description
                    completed
                }
            }
        }
    `

    public static GET_RANDOM_FACT_ON_PHASE_COMPLETION = gql`
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

}
