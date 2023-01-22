import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import Mutations from '../graphql/mutations';

type AddTaskComponentProps = {
    phaseId: string,
}

export const AddTaskComponent = ({ phaseId }: AddTaskComponentProps) => {
    const [newTaskDescription, setNewTaskDescription] = useState<string>('');
    const [addTaskToPhase] = useMutation(Mutations.ADD_TASK_TO_PHASE, { 
        variables: { phaseId, taskDescription: newTaskDescription },
        onCompleted: (data) => {
            console.log(data);
        }
    });
    
    return (
        <div>
            <div className="">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
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
