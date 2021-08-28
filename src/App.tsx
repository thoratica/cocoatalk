import React from 'react';
import useLogon from './hooks/useLogon';
import Login from './pages/Login';
import Main from './pages/Main';
import { Toaster } from 'react-hot-toast';
import './App.scss';

const App = () => {
  const logon = useLogon();

  return (
    <div className='app'>
      <Toaster position='bottom-center' />
      {logon ? <Main /> : <Login />}
    </div>
  );
};

export default App;
