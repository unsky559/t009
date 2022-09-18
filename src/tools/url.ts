import config from '../config';

export const url = (endpoint: string) => `${config.API_URL}/${endpoint}`;
