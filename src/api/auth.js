import axios from 'axios';

// API 요청에 토큰을 포함하는 인터셉터 추가
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
    localStorage.removeItem('token');  // 로그아웃 시 토큰 삭제
    return axios.post('http://localhost:3000/api/logout');
  },

  // 현재 로그인된 사용자 정보 확인
  me: () => {
    return axios.get('http://localhost:3000/api/me');
  }
};