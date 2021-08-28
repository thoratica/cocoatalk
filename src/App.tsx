import React, { useEffect } from 'react';
import useLogon from './hooks/useLogon';
import Login from './pages/Login';
import Main from './pages/Main';
import toast, { Toaster } from 'react-hot-toast';
import Confetti from './components/Confetti';
import './App.scss';
import { api, client } from './store';

const App = () => {
  const logon = useLogon();

  return (
    <div className='app'>
      <Toaster position='bottom-center' />
      {logon ? (
        <>
          <Confetti />
          <Main />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
