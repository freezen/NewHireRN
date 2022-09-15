let token = '';
let key = '';
let auth = '';
let id = -1;

export const clearLogin = () => {
  token = '';
  key = '';
  auth = '';
  id = -1;
};

export const setCredentials = (
  pKey: string,
  pToken: string,
  pAuth: string,
  pId: number,
) => {
  token = pToken;
  key = pKey;
  auth = pAuth;
  id = pId;
};

export const getCredentials = () => {
  return {
    token,
    key,
    auth,
    id,
  };
};
