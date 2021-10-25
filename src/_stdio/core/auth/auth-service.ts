import axios from 'axios';
import { API_HOST } from '_stdio/environment';
import { AuthAxiosResponse, Axios_SetAuthToken } from '_stdio/shared/utils/axios/axios-utils';
import graphqlClient from '_stdio/shared/utils/graphql/graphql-client';
import { AUTH_TOKEN } from './auth-constants';
import { AuthType } from './auth-type';

export const AuthLogin = async (identifier: string, password: string) => {
  const { data } = await axios.post(`${API_HOST}auth/local`, {
    identifier,
    password,
  });
  return data as AuthType;
};

export const AuthLogout = async () => {
  localStorage.removeItem(AUTH_TOKEN);
  await graphqlClient.resetStore();
  Axios_SetAuthToken('');
};

export const AuthTeardown = async (auth: AuthType) => {
  localStorage.setItem(AUTH_TOKEN, auth.jwt);
  await graphqlClient.resetStore();
  Axios_SetAuthToken(auth.jwt);
};

export const AuthMe = async () => {
  return await AuthAxiosResponse(() => axios.get(`${API_HOST}users/me`));
};
