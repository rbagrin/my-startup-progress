import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Phases from './pages/phases';
import Home from './pages/home';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { HOME_ROUTE, PHASES_ROUTE, PHASE_DETAILS_ROUTE } from './routes';
import PhaseDetails from './pages/phase-details';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

export default function AppRouter() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path={PHASE_DETAILS_ROUTE} element={<PhaseDetails />} />
          <Route path={PHASES_ROUTE} element={<Phases />} />
          <Route index element={<Home />} />
          <Route path="*" element={<Navigate to={HOME_ROUTE} />}/>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);