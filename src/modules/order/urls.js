import {ROOT_URL} from '../../utils/constants';

export const API_URL = {
  order: (id) => {
    return `${ROOT_URL}orders/${id}/`;
  },
  orders: () => {
    return `${ROOT_URL}orders/`;
  },
  download_report: () => {
    return `${ROOT_URL}orders/download-report`;
  },
  feedback: (id) => {
    return `${ROOT_URL}orders/feedbacks/${id}/`;
  }
}
