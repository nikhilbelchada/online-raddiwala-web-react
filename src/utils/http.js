import customAxios from '../axios';

export class Http {
  static get(requestUrl, params) {
    if (!params) params = {};
    return customAxios({
      url: requestUrl,
      method: 'get',
      params: params,
      withCredentials: false,
    });
  }

  static post(url, data) {
    return customAxios({
      url: url,
      method: 'post',
      data: data,
    });
  }

  static delete(url, data) {
    return customAxios({
      url: url,
      method: 'delete',
      data: data
    });
  }

  static put(url, data) {
    return customAxios({
      url: url,
      method: 'put',
      data: data
    });
  }

  static startSpinner() {
    var element = document.getElementById('spinner-div');
    if(!element) return;
    element.style.display = "block";
  }
  static stopSpinner() {
    var element = document.getElementById('spinner-div');
    if(!element) return;
    element.style.display = "none";
  }

  static displayMessage(message) {
    var element = document.getElementById("snackbar")

    element.className = "show";
    element.innerText = message;
    setTimeout(function(){
      element.className = element.className.replace("show", "");
      element.innerText = "";
    }, 3000);
  }

}
