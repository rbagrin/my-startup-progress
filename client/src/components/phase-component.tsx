import React from "react";
import { generatePath, useNavigate } from "react-router-dom";

import { Phase } from "../interfaces";
import { FaCheckCircle, FaArrowAltCircleRight } from "react-icons/fa";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { PHASE_DETAILS_ROUTE } from "../routes";

interface PhaseProps {
  phase: Phase;
}

export const PhaseComponent = ({ phase }: PhaseProps) => {
  const navigate = useNavigate();

  const totalTasks = phase.tasks.length;
  const completedTasks = phase.tasks.filter((task) => task.completed).length;

  return (
    <div
      onClick={() =>
        navigate(generatePath(PHASE_DETAILS_ROUTE, { phaseId: phase.id }))
      }
      className="mb-5"
    >
      <div className="flex flex-row gap-5 bg-green-100 p-1 rounded-md justify-between">
        <div className="flex flex-row gap-5">
          <div className="mt-2">
            {phase.completed ? (
              <FaCheckCircle size={24} color="green" />
            ) : (
              <RiCheckboxBlankCircleLine size={25} />
            )}
          </div>

          <div className="flex flex-col">
            <div>
              <h1 className="text-md font-semibold">{phase.name}</h1>
            </div>

            <div>
              <p className="text-sm font-light text-gray-500">
                {phase.description}
              </p>
            </div>
          </div>
        </div>

        <div className="cursor-pointer drop-shadow-xl mt-2">
          <FaArrowAltCircleRight size={25} />
        </div>
      </div>

      {totalTasks > 0 ? (
        <p className="text-sm font-light">
          {completedTasks}/{totalTasks} completed tasks
        </p>
      ) : (
        <p className="text-sm font-light text-red-500">
          Add a task to this phase to be able to complete it!
        </p>
      )}
    </div>
  );
};
