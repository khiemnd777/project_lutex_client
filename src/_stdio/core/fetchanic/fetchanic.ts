import { isEmpty, isFunction } from 'lodash-es';
import { useState } from 'preact/hooks';
import { FetchanicError } from './fetchanic-error';

export interface FetchanicResult<TData> {
  data?: TData;
  loading: boolean;
  error?: FetchanicError;
}

const Fetchanic = <TData>(func: Promise<TData>) => {
  const [data, setData] = useState<TData>({} as TData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FetchanicError>({} as FetchanicError);
  if (isFunction(func)) {
    void func
      .then((data) => setData(data))
      .catch((err: any) => setError(new FetchanicError(err.message)))
      .finally(() => setLoading(false));
  }
  const oData = isEmpty(data) ? null : data;
  const oError = isEmpty(error) ? null : error;
  return {
    data: oData,
    loading: loading,
    error: oError,
  } as FetchanicResult<TData>;
};

export default Fetchanic;
