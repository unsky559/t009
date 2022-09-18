import axios from 'axios';
import IError from '../types/IError';
import ILogin from '../types/ILogin';
import IRegister from '../types/IRegister';
import { IAuth } from '../types/IAuth';
import { url } from '../tools/url';
import { axiosEr } from './middlewares/network.e';

export default class AuthService {
  static login(data: ILogin) {
    return async () => {
      const result = await axios.post<IAuth | IError>(url('sessions'), data)
        .catch(axiosEr);

      const resp = result.data;

      if ('error' in resp) {
        throw resp;
      }

      if (resp.token) {
        axios.defaults.headers.common.Authorization = resp.token;
      }

      return resp;
    };
  }

  static register(data: IRegister) {
    return async () => {
      const result = await axios.post(url('users'), data)
        .catch(axiosEr);

      const resp: Partial<IAuth> = result.data;

      if ('error' in resp) {
        throw resp;
      }

      if (resp.token) {
        axios.defaults.headers.common.Authorization = resp.token;
      }

      return resp;
    };
  }
}
