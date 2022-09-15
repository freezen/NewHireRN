import axios from 'axios';
import {getCredentials} from './login';

export const reqConfig = {
  url: 'http://34.220.173.157:7001',
  // url: 'http://10.0.2.2:7001',
};

export const get = (path: string) => {
  console.log('reqConfig.url:', reqConfig.url);
  return axios.get(reqConfig.url + path, {
    headers: {
      ...getCredentials(),
    },
  });
};

export const post = (
  path: string,
  param: Record<string, string | number | boolean>,
) => {
  return axios.post(reqConfig.url + path, param, {
    headers: {
      ...getCredentials(),
    },
  });
};
