import axios from 'axios';
import { url } from '../tools/url';
import { axiosEr } from './middlewares/network.e';
import { errorFilter } from './middlewares/errorFilter';

interface ICreateReq {
  title: string,
  year: number,
  format: string,
  actors: string[]
}

interface IImportReq {
  formData: FormData
}

interface IIdReq {
  id: number
}

interface IMoviesReq {
  search?: string,
}

export default class FilmService {
  static movies(data?: IMoviesReq, page = 1) {
    return async () => {
      const result = await axios.get(url('movies'), {
        params: { sort: 'title', order: 'ASC', limit: 10, offset: (page - 1) * 10, search: data?.search },
      })
        .catch(axiosEr);

      return errorFilter(result);
    };
  }

  static create(data: ICreateReq) {
    return async () => {
      const result = await axios.post(url('movies'), data)
        .catch(axiosEr);

      return errorFilter(result);
    };
  }

  static import(data: IImportReq) {
    return async () => {
      const result = await axios.post(url('movies/import'), data.formData)
        .catch(axiosEr);

      return errorFilter(result);
    };
  }

  static delete(data: IIdReq) {
    return async () => {
      const result = await axios.delete(url(`movies/${data.id}`))
        .catch(axiosEr);

      return errorFilter(result);
    };
  }

  static show(data: IIdReq) {
    return async () => {
      const result = await axios.get(url(`movies/${data.id}`))
        .catch(axiosEr);

      return errorFilter(result);
    };
  }
}
