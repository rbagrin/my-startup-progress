import React from "react";
import { useQuery } from "@apollo/client";
import { FaHome } from "react-icons/fa";

import { QueryResult } from "../components/query-result";
import { Phase } from "../interfaces";
import { useNavigate, useParams } from "react-router-dom";
import Queries from "../graphql/queries";
import { PhaseDetailsComponent } from "../components/phase-details.component";
import { AddTaskComponent } from "../components/add-task.component";
import { HOME_ROUTE } from "../routes";

const PhaseDetails = () => {
  const { phaseId } = useParams<{ readonly phaseId: string }>();
  const { loading, error, data } = useQuery<{ phase: Phase }>(
    Queries.GET_PHASE_BY_ID,
    { variables: { phaseId } }
  );

  const navigate = useNavigate();

  return (
    <div>
      <div
        className="flex flex-row gap-5 mb-5 cursor-pointer w-fit"
        onClick={() => navigate(HOME_ROUTE)}
      >
        <FaHome size={20} />
        <p className="text-md font-bold">My startup</p>
      </div>
      <QueryResult loading={loading} error={error} data={data}>
        <div>
          {data?.phase && <PhaseDetailsComponent phase={data.phase} />}
          <AddTaskComponent
            phaseId={phaseId!}
            noOfTasks={data?.phase.tasks.length ?? 0}
          />
        </div>
      </QueryResult>
    </div>
  );
};

export default PhaseDetails;
