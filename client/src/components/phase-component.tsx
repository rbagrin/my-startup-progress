import React from "react";
import { Phase } from "../interfaces";

interface PhaseProps {
    phase: Phase;
};

export const PhaseComponent = ({ phase }: PhaseProps) => {
    return <div>
        <div className='flex flex-row gap-5'>
            <input type="checkbox" checked={phase.completed} disabled />
            <h3>{phase.id} - {phase.name}</h3>
        </div>
        <h6>{phase.description}</h6>
        <p>Tasks: {JSON.stringify(phase.tasks)}</p>
        
        <p>{phase.completed ? "COMPLETED" : "INCOMPLETE"}</p>
    </div>
}