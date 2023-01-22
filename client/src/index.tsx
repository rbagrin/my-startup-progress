import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './app-router';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <div className='flex justify-center items-center h-screen bg-blue-100'>
      <div className='w-128 bg-white p-10 rounded-md'>
        <AppRouter />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
