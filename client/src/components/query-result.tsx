import React from 'react';
import { ApolloError } from "@apollo/client/errors";
import { ReactElement } from 'react';

interface QueryResultProps {
    loading: boolean;
    error: ApolloError | undefined;
    data: any;
    children: ReactElement;
}

export const QueryResult = ({ loading, error, data, children }: QueryResultProps) => {
    if (error)
        return <p>Error: {error.message}</p>

    if (loading)
        return <p>Loading...</p>

    if (data)
        return children;

    return <p>Nothing to show.</p>
}
