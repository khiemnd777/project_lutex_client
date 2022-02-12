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
  localStorage.removeItem('identifier');
  localStorage.removeItem('password');
  await graphqlClient.resetStore();
  Axios_SetAuthToken('');
};

export const AuthTeardown = async (identifier: string, password: string, auth: AuthType) => {
  localStorage.setItem(AUTH_TOKEN, auth.jwt);
  localStorage.setItem('identifier', identifier);
  localStorage.setItem('password', password);
  await graphqlClient.resetStore();
  Axios_SetAuthToken(auth.jwt);
};

export const AuthMe = async () => {
  return await AuthAxiosResponse(() => axios.get(`${API_HOST}users/me`));
};

export const refreshToken = async () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const tokenRefreshResponse = await axios.post(`${API_HOST}auth/refresh-token`, {
    token: authToken,
  });
  const jwt = tokenRefreshResponse.data.jwt;
  localStorage.setItem(AUTH_TOKEN, jwt);
  Axios_SetAuthToken(jwt);
  await graphqlClient.resetStore();
};
