import {ROOT_URL} from '../../utils/constants';

export const API_URL = {
  user_detail: (id) => {
    return `${ROOT_URL}mauth/${id}`;
  },
  users: () => {
    return `${ROOT_URL}mauth/users`;
  },
  change_password: (id) => {
    return `${ROOT_URL}mauth/change-password/${id}`;
  },
}
