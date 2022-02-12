import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { AUTH_TOKEN } from '_stdio/core/auth/auth-constants';
import { AuthLogin, AuthLogout, AuthTeardown } from '_stdio/core/auth/auth-service';
import { API_HOST } from '_stdio/environment';
import { Axios_SetAuthToken } from '_stdio/shared/utils/axios/axios-utils';

axios.defaults.baseURL = `${API_HOST}`;
const authToken = localStorage.getItem(AUTH_TOKEN);
if (authToken) {
  Axios_SetAuthToken(authToken);
}

const refreshAuthLogic = async (failedRequest: any) => {
  const identifier = localStorage.getItem('identifier');
  const password = localStorage.getItem('password');
  if (identifier && password) {
    const loginInfo = await AuthLogin(identifier, password);
    await AuthTeardown(identifier, password, loginInfo);
    return;
  }
  await AuthLogout();
  // const tokenRefreshResponse = await axios.post(`${API_HOST}auth/refresh-token`, {
  //   token: failedRequest.response.config.headers['Authorization'].split(' ')[1],
  // });
  // const jwt = tokenRefreshResponse.data.jwt;
  // localStorage.setItem(AUTH_TOKEN, jwt);
  // failedRequest.response.config.headers['Authorization'] = `Bearer ${jwt}`;
  // Axios_SetAuthToken(jwt);
  // await graphqlClient.resetStore();
};

createAuthRefreshInterceptor(axios, refreshAuthLogic);
