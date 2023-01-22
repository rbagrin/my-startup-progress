import React from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { QueryResult } from '../components/query-result';
import { PhaseComponent } from '../components/phase-component';
import { Phase } from '../interfaces';
import { GET_PHASE_BY_ID, MARK_TASK_AS_COMPLETED } from '../queries/phase.queries';
import { useParams } from 'react-router-dom';
import Button from '../components/button';


const PhaseDetails = () => {
  const { phaseId } = useParams<{ readonly phaseId: string }>();
  const { loading, error, data } = useQuery<{ phase: Phase }>(GET_PHASE_BY_ID, { variables: { phaseId }});

  const [markTaskAsComplete] = useMutation(MARK_TASK_AS_COMPLETED, { 
    variables: { taskId: 't2' },
    onCompleted: (data) => {
      console.log(data);
    }
  });

  return <div>
    <QueryResult loading={loading} error={error} data={data}>
      <>
        <h1>PHASE Details</h1>
        {data?.phase && (
          <div>
            <PhaseComponent phase={data.phase} />
          </div>
        )}
      </>
    </QueryResult>

    <Button text='Mark task as completed' onClick={() => markTaskAsComplete()} />
  </div>;
};

export default PhaseDetails;
