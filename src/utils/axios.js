import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://18.177.3.0:8000/',
  timeout: 2000
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (!error.response) {
      return Promise.reject(error.message);
    }
    if (error.response.status === 500) {
      return Promise.reject('伺服器錯誤');
    } else if (error.response.status === 400) {
      return Promise.reject('驗證失敗');
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
