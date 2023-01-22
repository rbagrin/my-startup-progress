import React from "react";

import { Phase } from "../interfaces";
import { FaCheckCircle, FaTrash } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';

import { useMutation } from "@apollo/client";
import Mutations from "../graphql/mutations";

interface PhaseDetailsComponentProps {
    phase: Phase;
};

export const PhaseDetailsComponent = ({ phase }: PhaseDetailsComponentProps) => {
    const [markTaskAsComplete] = useMutation(Mutations.MARK_TASK_AS_COMPLETED, { 
        variables: { taskId: 't2' },
        onCompleted: (data) => {
            console.log(data);
        }
    });
      
    return (
        <div>
            <div className='flex flex-row gap-5 bg-green-100 p-1 rounded-md mb-5'>
                <div className='mt-2'>
                    {phase.completed && (<FaCheckCircle size={24} color='green' />)}
                </div>

                <div className="flex flex-col">
                    <div>
                        <h1 className="text-md font-semibold">{phase.name}</h1>
                    </div>
                    
                    <div>
                        <p className='text-sm font-light text-gray-500'>{phase.description}</p>
                    </div>
                </div>
            </div>

            {phase.tasks.map((task) => (
                <div className='flex flex-row gap-5 mb-5 bg-gray-100 rounded-md justify-between'>
                    <div className='flex flex-row gap-1 items-center'>
                        <div className='w-4'>
                            {task.completed && <IoMdCheckmarkCircleOutline size={15} color='green' />}
                        </div>
                        <p className='text-sm'>{task.description}</p>
                    </div>
                    <div className="flex flex-row gap-1">
                        <div className='p-2'>
                            {task.completed ?
                                null :
                                (<IoMdCheckmarkCircleOutline size={20} onClick={() => markTaskAsComplete({variables: { taskId: task.id }})} />)
                            }
                        </div>

                        <div className='p-2'>
                            <FaTrash size={15} color='red' />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}