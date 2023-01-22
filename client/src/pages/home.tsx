import React from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_PHASE_ROUTE } from "../routes";
import { QueryResult } from "../components/query-result";
import { Phase } from "../interfaces";
import { RandomFactComponent } from "../components/random-fact.component";
import Queries from "../graphql/queries";
import { PhaseComponent } from "../components/phase-component";
import { FaPlus } from "react-icons/fa";

const Home = () => {
  const {
    loading: getPhasesLoading,
    error: getPhasesError,
    data: getPhasesData,
  } = useQuery<{ phases: Phase[] }>(Queries.GET_PHASES);

  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">My startup progress</h1>
        <div className="bg-gray-100 rounded-md p-1 cursor-pointer">
          <FaPlus size={30} onClick={() => navigate(ADD_PHASE_ROUTE)} />
        </div>
      </div>

      <QueryResult
        loading={getPhasesLoading}
        error={getPhasesError}
        data={getPhasesData}
      >
        <div>
          {getPhasesData?.phases!.map((phase, index) => (
            <PhaseComponent key={index} phase={phase} />
          ))}
          {!getPhasesData?.phases!.some((phase) => !phase.completed) && (
            <RandomFactComponent />
          )}
        </div>
      </QueryResult>
    </div>
  );
};

export default Home;
