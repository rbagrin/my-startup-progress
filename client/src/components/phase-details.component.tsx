import React from "react";

import { Phase } from "../interfaces";
import { FaCheckCircle, FaTrash, FaRedoAlt } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { useMutation } from "@apollo/client";
import Mutations from "../graphql/mutations";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../routes";
import Queries from "../graphql/queries";

interface PhaseDetailsComponentProps {
  phase: Phase;
}

export const PhaseDetailsComponent = ({
  phase,
}: PhaseDetailsComponentProps) => {
  const navigate = useNavigate();

  const [markTaskAsComplete] = useMutation(Mutations.MARK_TASK_AS_COMPLETED, {
    variables: { taskId: "" },
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const [markTaskAsIncomplete] = useMutation(
    Mutations.MARK_TASK_AS_INCOMPLETE,
    {
      variables: { taskId: "" },
      refetchQueries: [{ query: Queries.GET_PHASES }],
      onCompleted: (data) => {
        console.log(data);
      },
    }
  );

  const [deletePhaseTaskById] = useMutation(Mutations.DELETE_PHASE_TASK_BY_ID, {
    variables: { phaseId: phase.id, taskId: "" },
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const [deletePhaseById] = useMutation(Mutations.DELETE_PHASE_BY_ID, {
    variables: { phaseId: phase.id },
    refetchQueries: [{ query: Queries.GET_PHASES }],
    onCompleted: (data) => {
      console.log(data);
    },
  });

  return (
    <div>
      <div className="flex flex-row justify-between gap-5 bg-green-100 p-1 rounded-md mb-5">
        <div className="flex flex-row gap-5">
          <div className="mt-2">
            {phase.completed && <FaCheckCircle size={24} color="green" />}
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

        <div className="p-2 cursor-pointer">
          <FaTrash
            size={15}
            color="red"
            onClick={async () => {
              await deletePhaseById({ variables: { phaseId: phase.id } });
              navigate(HOME_ROUTE);
            }}
          />
        </div>
      </div>

      {phase.tasks.length > 0 && (
        <div className="flex flex-row justify-between">
          <p className="text-sm font-light pl-5">Tasks</p>
          <p className="text-sm font-light pr-5">Actions</p>
        </div>
      )}

      {phase.tasks.map((task, index) => (
        <div
          key={index}
          className="flex flex-row gap-5 mb-5 bg-gray-100 rounded-md justify-between"
        >
          <div className="flex flex-row gap-1 items-center">
            <div className="w-4">
              {task.completed && (
                <IoMdCheckmarkCircleOutline size={15} color="green" />
              )}
            </div>
            <p className="text-sm">{task.description}</p>
          </div>
          <div className="flex flex-row gap-1">
            <div className="p-2 cursor-pointer">
              {task.completed ? (
                <FaRedoAlt
                  size={15}
                  color="#555"
                  onClick={() =>
                    markTaskAsIncomplete({ variables: { taskId: task.id } })
                  }
                />
              ) : (
                <IoMdCheckmarkCircleOutline
                  size={20}
                  onClick={() =>
                    markTaskAsComplete({ variables: { taskId: task.id } })
                  }
                />
              )}
            </div>

            <div className="p-2 cursor-pointer">
              <FaTrash
                size={15}
                color="red"
                onClick={async () =>
                  deletePhaseTaskById({
                    variables: { phaseId: phase.id, taskId: task.id },
                  })
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
