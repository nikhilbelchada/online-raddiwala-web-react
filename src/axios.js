import axios from 'axios';

import {ROOT_URL} from './utils/constants';

const instance = axios.create({
  baseURL: ROOT_URL,
  headers: {'Content-Type': 'application/json'}
});

instance.defaults.headers.post['Content-Type'] ='application/json;';
//instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default instance;
