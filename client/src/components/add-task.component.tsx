import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import Mutations from '../graphql/mutations';
import Queries from '../graphql/queries';

type AddTaskComponentProps = {
    phaseId: string;
    noOfTasks: number;
}

export const AddTaskComponent = ({ phaseId, noOfTasks }: AddTaskComponentProps) => {
    const [newTaskDescription, setNewTaskDescription] = useState<string>('');
    const [addTaskToPhase] = useMutation(Mutations.ADD_TASK_TO_PHASE, { 
        variables: { phaseId, taskDescription: newTaskDescription },
        refetchQueries: [{ query: Queries.GET_PHASES }],
        onCompleted: (data) => {
            console.log(data);
        }
    });
    
    return (
        <div className='mt-5'>
            <div>
                <label className={`block text-sm font-bold mb-2${noOfTasks === 0 ? ' text-red-500' : ' text-gray-700'}`} htmlFor="description">
                    Add new task
                </label>
                <input value={newTaskDescription} onChange={(e) => setNewTaskDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder='Task description' />
            </div>

            {newTaskDescription && (
                <button onClick={() => {
                    addTaskToPhase({ variables: { phaseId, taskDescription: newTaskDescription }});
                    setNewTaskDescription('');
                }}>
                    Add
                </button>
            )}
        </div>
    );
}
