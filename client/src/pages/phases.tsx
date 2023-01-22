import React from 'react';
import { useQuery } from "@apollo/client";
import { QueryResult } from '../components/query-result';
import { PhaseComponent } from '../components/phase-component';
import { Phase } from '../interfaces';
import { GET_PHASES } from '../queries/phase.queries';

const Phases = () => {
  const { loading, error, data } = useQuery<{ phases: Phase[] }>(GET_PHASES);

  return <div>
    <QueryResult loading={loading} error={error} data={data}>
      <>
        <h1>PHASES</h1>
        <div>
          {data?.phases.map((phase) => <PhaseComponent phase={phase} />)}
        </div>
      </>
    </QueryResult>
  </div>;
};

export default Phases;
