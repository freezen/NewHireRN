import axios from 'axios';
import {getCredentials} from './login';
import {Alert, Platform} from 'react-native';

const TIMEOUT = 10 * 1000;

export const reqConfig = {
  // url: 'http://34.220.173.157:7001',
  url:
    Platform.OS === 'ios'
      ? 'http://34.220.173.157:7001'
      : 'http://10.0.2.2:7001',
};

const axiosGet = (url: string, options = {}) => {
  const abort = axios.CancelToken.source();
  const id = setTimeout(() => {
    Alert.alert(
      'Warning',
      'Your network is slow now, please check it.',
      [
        {
          text: 'OK',
          onPress: () => console.log,
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
    abort.cancel(`Timeout of ${TIMEOUT} ms.`);
  }, TIMEOUT);
  return axios
    .get(url, {cancelToken: abort.token, ...options})
    .then(response => {
      clearTimeout(id);
      return response;
    });
};

const axiosPost = (url: string, param: any, options = {}) => {
  const abort = axios.CancelToken.source();
  const id = setTimeout(() => {
    Alert.alert(
      'Warning',
      'Your network is slow now, please check it.',
      [
        {
          text: 'OK',
          onPress: () => console.log,
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
    abort.cancel(`Timeout of ${TIMEOUT} ms.`);
  }, TIMEOUT);
  return axios
    .post(url, param, {cancelToken: abort.token, ...options})
    .then(response => {
      clearTimeout(id);
      return response;
    });
};

export const get = (path: string) => {
  console.log('reqConfig.url:', reqConfig.url);
  return axiosGet(reqConfig.url + path, {
    headers: {
      ...getCredentials(),
    },
    timeout: TIMEOUT,
  });
};

export const post = (
  path: string,
  param: Record<string, string | number | boolean>,
  isAnotherDomain?: boolean,
) => {
  let url = reqConfig.url + path;
  if (isAnotherDomain === true) {
    url = path;
  }
  return axiosPost(url, param, {
    headers: {
      ...getCredentials(),
    },
    timeout: TIMEOUT,
  });
};
