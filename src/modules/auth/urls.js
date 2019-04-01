import {ROOT_URL} from '../../utils/constants';

export const API_URL = {
  login: () => {
    return `${ROOT_URL}mauth/api-token-auth/`;
  },
  register: () => {
    return `${ROOT_URL}mauth/register/`;
  },
}
