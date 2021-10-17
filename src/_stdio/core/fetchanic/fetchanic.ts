import { isEmpty, isFunction } from 'lodash-es';
import { useEffect, useState } from 'preact/hooks';
import { FetchanicError } from './fetchanic-error';

export interface FetchanicResult<TData> {
  data?: TData;
  loading: boolean;
  error?: FetchanicError;
}

const Fetchanic = <TData>(func: () => Promise<TData>, ...keyArgs: string[]) => {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FetchanicError | null>(null);
  const [keys, setKeys] = useState<string[]>([]);
  if (JSON.stringify(keyArgs) !== JSON.stringify(keys)) {
    setData(null);
    setLoading(false);
    setError(null);
    setKeys(keyArgs);
    return {
      data: null,
      loading: false,
      error: null,
    };
  }
  useEffect(() => {
    if (isFunction(func)) {
      setLoading(true);
      void func()
        .then((data) => setData(data))
        .then(() => {
          setLoading(false);
        })
        .catch((err: any) => {
          setLoading(false);
          setError(new FetchanicError(err.message));
        });
    }
  }, [...keys]);
  const oData = isEmpty(data) ? null : data;
  const oError = isEmpty(error) ? null : error;
  return {
    data: oData,
    loading: loading,
    error: oError,
  } as FetchanicResult<TData>;
};

export default Fetchanic;
