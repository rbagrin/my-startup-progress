import React from 'react';
import Button from '../components/button';
import { useNavigate } from 'react-router-dom';
import { PHASES_ROUTE } from '../routes';

const Home = () => {
    const navigate = useNavigate();
    return <div>
        <h1>HOME</h1>
        <div>
            <Button text="Go to Tracks" onClick={() => navigate(PHASES_ROUTE)} />
        </div>
    </div>;
};

export default Home;
