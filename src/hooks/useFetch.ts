import { useState } from 'react';
import IError from '../types/IError';

// eslint-disable-next-line no-unused-vars
export default function useFetch<ResponceType>(callback: () => Promise<any>):
    {
      fetching: () => Promise<void>,
      isLoading: boolean,
      error: IError | null,
      data: ResponceType
    } {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState();

  const fetching = async () => {
    try {
      setIsLoading(true);
      const resp = await callback();
      setData(resp);
    } catch (er) {
      setError(er);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetching,
    isLoading,
    error,
    data,
  };
}
