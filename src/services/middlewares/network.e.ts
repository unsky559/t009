import { AxiosError } from 'axios';
import IError from '../../types/IError';

export const axiosEr = (e: AxiosError) => {
  const errorObject: IError = {
    status: 0,
    error: {
      code: e.code,
    },
  };
  throw errorObject;
};
