import React from "react";
import { Phase } from "../interfaces";

interface PhaseProps {
    phaseNo: number;
    phase: Phase;
};

export const PhaseComponent = ({ phaseNo, phase }: PhaseProps) => {
    return <div>
        <div className='flex flex-row gap-5'>
            <div>{phaseNo}</div>
            <h3>{phase.id} - {phase.name}</h3>
        </div>
        <h6>{phase.description}</h6>
        <p>Tasks: {JSON.stringify(phase.tasks)}</p>
        
        <p>{phase.completed ? "COMPLETED" : "INCOMPLETE"}</p>
    </div>
}