import { ref } from 'vue';
import { authApi } from '@/api/auth';

export function useAuth() {
  const isLoggedIn = ref(false);
  const isLoginModalOpen = ref(false);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await authApi.me();
        if (res.data.status === 'success') {
          isLoggedIn.value = true;
        }
      }
    } catch (error) {
      console.error('인증 확인 실패:', error);
      localStorage.removeItem('token');
      isLoggedIn.value = false;
    }
  };

  const handleLoginSuccess = () => {
    isLoggedIn.value = true;
    isLoginModalOpen.value = false;
  };

  const handleLogout = async () => {
    try {
      const response = await authApi.logout();
      if (response.data.status === 'success') {
        isLoggedIn.value = false;
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return {
    isLoggedIn,
    isLoginModalOpen,
    checkAuth,
    handleLoginSuccess,
    handleLogout
  };
}