import axios from 'axios';

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (email, password) => {
    return axios.post('http://localhost:3000/api/login', { email, password });
  },

  logout: () => {
    localStorage.removeItem('token');  
    return axios.post('http://localhost:3000/api/logout');
  },

  me: () => {
    return axios.get('http://localhost:3000/api/me');
  }
};