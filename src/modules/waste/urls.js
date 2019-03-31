import {ROOT_URL} from '../../utils/constants';

export const API_URL = {
  waste: (id) => {
    return `${ROOT_URL}wastes/${id}/`;
  },
  wastes: () => {
    return `${ROOT_URL}wastes/`;
  },
  wasteCategory: (id) => {
    return `${ROOT_URL}waste-categories/${id}/`;
  },
  wasteCategories: () => {
    return `${ROOT_URL}waste-categories/`;
  },
}
