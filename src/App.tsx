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

  useEffect(() => {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const forced = localStorage.getItem('forced');

    if (email === null || password === null || forced === null) return;

    (async () => {
      const apiLoginRes = await api.login({ email, password, forced: forced === 'true' });
      if (!apiLoginRes.success) return;

      const loginRes = await client.login(apiLoginRes.result);
      if (!loginRes.success) return;

      toast.success('자동 로그인 성공');
      client.emit('login' as any);
    })();
  }, []);

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
