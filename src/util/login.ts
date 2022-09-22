let token = '';
let key = '';
let auth = '';
let id = -1;
let expireTime = -1;
let loginTime = -1;

export const clearLogin = () => {
  token = '';
  key = '';
  auth = '';
  id = -1;
  expireTime = -1;
};

export const setCredentials = (
  pKey: string,
  pToken: string,
  pAuth: string,
  pId: number,
  pExpireTime: number,
) => {
  token = pToken;
  key = pKey;
  auth = pAuth;
  id = pId;
  expireTime = pExpireTime;
  loginTime = Date.now();
};

export const getCredentials = () => {
  return {
    token,
    key,
    auth,
    id,
    expireTime,
    loginTime,
  };
};
