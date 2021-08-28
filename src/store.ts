import { hostname } from 'os';
import { AuthApiClient, DefaultConfiguration, TalkClient } from './node-kakao';
import { AxiosWebClient } from './node-kakao/api/axios-web-client';
import { Win32XVCProvider } from './node-kakao/api/xvc';

export const name = hostname();
export const uuid = 'loco';

export const client = new TalkClient();
export const api = new AuthApiClient(new AxiosWebClient('https', 'katalk.kakao.com'), name, uuid, DefaultConfiguration, Win32XVCProvider);
