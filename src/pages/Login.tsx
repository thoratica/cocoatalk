import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { KnownAuthStatusCode } from '../node-kakao';
import { api, client } from '../store';

const Login = () => {
  const [page, setPage] = useState<'login' | 'register'>('login');
  const [useForceLogin, setUseForceLogin] = useState(false);
  const [defaultEmail, setDefaultEmail] = useState('');
  const [focusedInput, setFocusedInput] = useState<0 | 1 | 2>(0);
  const [_email, setEmail] = useState('');
  const [_password, setPassword] = useState('');
  const inputRef0 = useRef<HTMLInputElement | null>(null);
  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (focusedInput === 0) inputRef0.current?.focus();
    else if (focusedInput === 1) inputRef1.current?.focus();
    else if (focusedInput === 2) inputRef2.current?.focus();
  }, [focusedInput]);

  useEffect(() => {
    const email = localStorage.getItem('email');

    if (email === null) return;
    else {
      setDefaultEmail(email.toString());
      setFocusedInput(1);
    }
  }, []);

  let login = async (_email: string, _password: string) => {};

  const registerDevice = async (passcode: string) => {
    const registerRes = await api.registerDevice({ email: _email, password: _password }, passcode, true);
    if (!registerRes.success) return alert(`Error: ${KnownAuthStatusCode[registerRes.status]} (${registerRes.status})`);

    return await login(_email, _password);
  };

  login = async (email: string, password: string) => {
    const apiLoginRes = await api.login({ email, password, forced: useForceLogin });
    if (!apiLoginRes.success) {
      if (apiLoginRes.status === KnownAuthStatusCode.DEVICE_NOT_REGISTERED) {
        setEmail(email);
        setPassword(password);
        api.requestPasscode({ email, password });
        setPage('register');
        setFocusedInput(2);
        return;
      } else return alert(`Error: ${KnownAuthStatusCode[apiLoginRes.status]} (${apiLoginRes.status})`);
    }

    const loginRes = await client.login(apiLoginRes.result);
    if (!loginRes.success) return alert(`Error: ${KnownAuthStatusCode[loginRes.status]} (${loginRes.status})`);

    localStorage.setItem('email', email);
    toast.success('로그인 성공');
    client.emit('login' as any);
  };

  return (
    <div className='login'>
      <h1 className='title'>{page === 'login' ? '로그인' : '기기 인증'}</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          page === 'login'
            ? await login(((e.target as HTMLFormElement)[0] as HTMLInputElement).value, ((e.target as HTMLFormElement)[1] as HTMLInputElement).value)
            : await registerDevice(((e.target as HTMLFormElement)[2] as HTMLInputElement).value);
          return;
        }}
      >
        <label className='text'>
          <span>이메일 주소</span>
          <input
            ref={inputRef0}
            name='email'
            type='email'
            placeholder='cocoatalk@kakao.com'
            disabled={page === 'register'}
            defaultValue={defaultEmail}
            autoFocus
          />
        </label>
        <label className='text'>
          <span>비밀번호</span>
          <input ref={inputRef1} name='password' type='password' placeholder='p@asw0rd' disabled={page === 'register'} />
        </label>
        <label className={'text passcode' + (page === 'register' ? ' show' : '')}>
          <span>인증번호</span>
          <input ref={inputRef2} name='passcode' type='text' placeholder='0000' maxLength={4} />
        </label>
        <label className='checkbox'>
          <input type='checkbox' checked={useForceLogin} onChange={(e) => setUseForceLogin(e.target.checked)} />
          <div className={'checkbox' + (useForceLogin ? ' checked' : '')} />
          <span>강제 로그인</span>
          <details>
            <summary>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#878787'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='feather feather-help-circle'
              >
                <circle cx='12' cy='12' r='10'></circle>
                <path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'></path>
                <line x1='12' y1='17' x2='12.01' y2='17'></line>
              </svg>
            </summary>
            <div>다른 PC에서 접속중인 경우 해당 기기를 로그아웃 시키고 강제로 로그인합니다.</div>
          </details>
        </label>
        <button type='submit'>{page === 'login' ? '로그인' : '인증'}</button>
      </form>
    </div>
  );
};

export default Login;
