import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { AUTH_TOKEN } from '_stdio/core/auth/auth-constants';
import { API_HOST } from '_stdio/environment';
import graphqlClient from '_stdio/shared/utils/graphql/graphql-client';

axios.defaults.baseURL = `${API_HOST}`;
const authToken = localStorage.getItem(AUTH_TOKEN);
if (authToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}

const refreshAuthLogic = async (failedRequest: any) => {
  const tokenRefreshResponse = await axios.post(`${API_HOST}auth/refresh-token`, {
    token: failedRequest.response.config.headers['Authorization'].split(' ')[1],
  });
  const jwt = tokenRefreshResponse.data.jwt;
  localStorage.setItem(AUTH_TOKEN, jwt);
  failedRequest.response.config.headers['Authorization'] = `Bearer ${jwt}`;
  Axios_SetAuthToken(jwt);
  await graphqlClient.resetStore();
};

createAuthRefreshInterceptor(axios, refreshAuthLogic);

// Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
// See below for an example using Custom instance defaults instead.
export const Axios_SetAuthToken = (authToken) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
};
