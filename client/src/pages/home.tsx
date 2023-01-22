import React from 'react';
import { useQuery } from "@apollo/client";
import Button from '../components/button';
import { useNavigate } from 'react-router-dom';
import { PHASES_ROUTE } from '../routes';
import { QueryResult } from '../components/query-result';
import { Phase } from '../interfaces';
// import { RandomFactComponent } from '../components/random-fact.component';
import Queries from '../graphql/queries';
import { PhaseComponent } from '../components/phase-component';

const Home = () => {
    // const { loading, error, data } = useQuery<{ randomFact: RandomFact }>(Queries.GET_RANDOM_FACT_ON_PHASE_COMPLETION);
    const { loading: getPhasesLoading, error: getPhasesError, data: getPhasesData } = useQuery<{ phases: Phase[] }>(Queries.GET_PHASES);

    const navigate = useNavigate();
    return <div>
        <h1 className="text-3xl font-bold">My startup progress</h1>
        <div>
            <Button text="Go to Tracks" onClick={() => navigate(PHASES_ROUTE)} />
        </div>

        {/* <QueryResult loading={loading} error={error} data={data}>
            <RandomFactComponent fact={data?.randomFact}/>
        </QueryResult> */}
        <QueryResult loading={getPhasesLoading} error={getPhasesError} data={getPhasesData}>
            <div>
                {getPhasesData?.phases!.map((phase) => <PhaseComponent phase={phase} />)}
            </div>
        </QueryResult>
    </div>;
};

export default Home;
