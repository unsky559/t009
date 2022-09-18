import { AxiosResponse } from 'axios';

export const errorFilter = (result: AxiosResponse) => {
  const resp = result.data;

  if ('error' in resp) {
    throw resp;
  }

  return resp;
};
