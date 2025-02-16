import axios from 'axios'

// API 기본 URL 설정
const API_URL = 'http://localhost:3000'

export const authApi = {
  // 로그인 요청
  login(email, password) {
    return axios.post(`${API_URL}/login`, {
      email: email,
      password: password
    })
  },

  logout() {
    return axios.post(`${API_URL}/logout`)
  }
}