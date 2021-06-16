// Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.

import axios, { AxiosResponse } from 'axios';

// See below for an example using Custom instance defaults instead.
export const Axios_SetAuthToken = (authToken) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
};

export const AuthAxiosResponse = async <T extends any>(action: () => Promise<AxiosResponse<T>>) => {
  try {
    const resp = await action();
    if (!resp) throw new Error('internal');
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    }
    if (resp.status === 401 || resp.status === 400) {
      throw new Error('unauthorized');
    }
  } catch (exc) {
    throw new Error(exc.message);
  }
};
