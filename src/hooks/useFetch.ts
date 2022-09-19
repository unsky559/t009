import { useState } from 'react';
import IError from '../types/IError';

// eslint-disable-next-line no-unused-vars
export default function useFetch<ResponceType>(callback: () => Promise<any>):
    {
      fetching: () => Promise<void>,
      isLoading: boolean,
      networkError: string,
      error: IError | null,
      data: ResponceType
    } {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [networkError, setNetworkError] = useState(null);
  const [data, setData] = useState();

  const fetching = async () => {
    try {
      setError(null);
      setData(null);
      setNetworkError(null);
      setIsLoading(true);
      const resp = await callback();
      setData(resp);
    } catch (er) {
      setError(er);

      if (er?.error?.code === 'ERR_NETWORK') {
        // TODO: remove this from here to some kind of callback param
        alert('Network connection error. Make sure that backend service is still running');
        setNetworkError(er.error.code);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetching,
    isLoading,
    networkError,
    error,
    data,
  };
}
