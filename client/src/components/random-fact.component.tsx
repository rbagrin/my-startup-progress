import { useQuery } from '@apollo/client';
import React from 'react'
import { SiStarship } from 'react-icons/si';

import Queries from '../graphql/queries';
import { RandomFact } from '../interfaces';
import { QueryResult } from './query-result';

export const RandomFactComponent = () => {
    const { loading, error, data: randomFactData } = useQuery<{ randomFact: RandomFact }>(Queries.GET_RANDOM_FACT_ON_PHASE_COMPLETION);
    return(
        <div className='mt-10'>
            <QueryResult loading={loading} error={error} data={randomFactData}>
                <div className='flex flex-col gap-3 bg-blue-100 p-5 rounded-md'>
                    <div className='flex flex-row gap-5 items-center'>
                        <div>
                            <SiStarship size={30} />
                        </div>
                        <h2 className='text-md font-semibold'>All phases have been completed!</h2>
                    </div>
                        
                    <p className='text-md font-light'>{randomFactData?.randomFact?.text}</p>
                </div>
            </QueryResult>
        </div>
    );
}
