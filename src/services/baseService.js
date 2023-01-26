import axios from 'axios';
import { DOMAIN } from '../util/settings/config';

export class baseService {
  put = (url, model) => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: 'PUT',
      data: model,
    });
  };
  post = (url, model) => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: 'POST',
      data: model,
    });
  };
  get = (url) => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: 'GET',
    });
  };
  delete = (url) => {
    return axios({
      url: `${DOMAIN}${url}`,
      method: 'DELETE',
    });
  };
}
