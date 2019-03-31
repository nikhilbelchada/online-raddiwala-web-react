import {ROOT_URL} from '../../utils/constants';

export const API_URL = {
  user_detail: (id) => {
    return `${ROOT_URL}mauth/${id}`;
  },
}
