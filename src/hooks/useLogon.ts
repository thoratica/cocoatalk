import { useState } from 'react';
import { client } from '../store';

const useLogon = () => {
  const [logon, setLogon] = useState(client.logon);

  const handler = () => setLogon(client.logon);
  client.on('login' as any, handler);
  client.on('disconnected', handler);
  client.on('error', handler);
  client.on('host_handover', handler);
  client.on('switch_server', handler);

  return logon;
};

export default useLogon;
