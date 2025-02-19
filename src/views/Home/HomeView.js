import { ref, onMounted } from 'vue'; 
import AppHeader from '@/components/AppHeader/AppHeader.vue';
import LoginModal from '@/components/LoginModal/LoginModal.vue';
import { postsApi } from '@/api/posts';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

export default {
  name: 'HomeView',
  components: { AppHeader, LoginModal }, 
  setup() {
    const router = useRouter();
    const posts = ref([]);
    const { isLoggedIn, isLoginModalOpen, checkAuth, handleLoginSuccess, handleLogout } = useAuth();

    const fetchPosts = async () => {
      try {
        const response = await postsApi.getAllPosts();
        posts.value = response.data;
      } catch (error) {
        console.error('게시물 불러오기 실패:', error);
      }
    };

    const goToDetail = (postId) => {
      router.push(`/posts/${postId}`);
    };

    onMounted(() => {
      checkAuth();
      fetchPosts();
    });

    return { 
      posts,
      isLoginModalOpen, 
      isLoggedIn,
      handleLoginSuccess,
      handleLogout,
      goToDetail
    };
  }
}