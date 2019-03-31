import customAxios from '../axios';

export class Http {
  static getHeader(passToken=true) {
    let header = { 'Content-Type': 'application/json' }

    if(passToken) {
      header.Authorization = 'Token ' + localStorage.getItem("token");
    }

    return header;
  }
  static get(requestUrl, params, passToken=true) {
    if (!params) params = {};
    return customAxios({
      url: requestUrl,
      method: 'get',
      params: params,
      headers: this.getHeader(passToken),
    });
  }

  static post(url, data, passToken=true) {
    return customAxios({
      url: url,
      method: 'post',
      data: data,
      headers: this.getHeader(passToken),
    });
  }

  static delete(url, data, passToken=true) {
    return customAxios({
      url: url,
      method: 'delete',
      data: data,
      headers: this.getHeader(passToken),
    });
  }

  static put(url, data, passToken=true) {
    return customAxios({
      url: url,
      method: 'put',
      data: data,
      headers: this.getHeader(passToken),
    });
  }
}
