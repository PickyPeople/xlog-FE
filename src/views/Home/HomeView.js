import { ref, onMounted } from 'vue'; 
import AppHeader from '../../components/AppHeader/AppHeader.vue';
import LoginModal from '../../components/LoginModal/LoginModal.vue';
import { authApi } from '@/api/auth';
import { postsApi } from '@/api/posts';

export default {
  name: 'HomeView',
  components: { AppHeader, LoginModal }, 
  setup() {
    const posts = ref([]);
    const isLoginModalOpen = ref(false);
    const isLoggedIn = ref(false);

    const fetchPosts = async () => {
      try {
        const response = await postsApi.getAllPosts();
        console.log(response.data);
        posts.value = response.data;
      } catch (error) {
        console.error('게시물 불러오기 실패:', error);
      }
    };

     // 로그인 상태 확인 함수
     const checkAuth = async () => {
      try {
        // localStorage에서 토큰 확인
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

    onMounted(() => {
      checkAuth();
      fetchPosts();
    });

    const handleLoginSuccess = () => {
      console.log('이전 로그인 상태:', isLoggedIn.value); // 추가
      isLoggedIn.value = true;
      console.log('변경된 로그인 상태:', isLoggedIn.value); // 추가
      isLoginModalOpen.value = false;
    };
    
    const handleLogout = async () => {
      try {
        console.log('로그아웃 시도');
        const response = await authApi.logout();
        
        if (response.data.status === 'success') {
          console.log('로그아웃 이전 상태:', isLoggedIn.value);
          isLoggedIn.value = false;
          console.log('로그아웃 이후 상태:', isLoggedIn.value);
        }
      } catch (error) {
        console.error('로그아웃 실패:', error);
        // 에러 처리가 필요하다면 여기에 추가
      }
    };

    return { 
      isLoginModalOpen, 
      isLoggedIn,
      posts,
      handleLoginSuccess,
      handleLogout
    };
  }
}
