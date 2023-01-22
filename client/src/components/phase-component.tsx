import React from "react";
import { Phase } from "../interfaces";

interface PhaseProps {
    phase: Phase;
};

export const PhaseComponent = ({ phase }: PhaseProps) => {
    return <div>
        <h3>{phase.id} - {phase.name}</h3>
        <h6>{phase.description}</h6>
        <p>Tasks: {JSON.stringify(phase.tasks)}</p>
        <p>{phase.completed ? "COMPLETED" : "INCOMPLETE"}</p>
    </div>
}