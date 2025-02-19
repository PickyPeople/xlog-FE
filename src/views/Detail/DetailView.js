import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { postsApi } from '@/api/posts';
import AppHeader from '@/components/AppHeader/AppHeader.vue';
import LoginModal from '@/components/LoginModal/LoginModal.vue';
import { useAuth } from '@/composables/useAuth';

export default {
  name: 'DetailView',
  components: { AppHeader, LoginModal }, 
  setup() {
    const route = useRoute();
    const router = useRouter();
    const post = ref(null);
    const { isLoggedIn, isLoginModalOpen, checkAuth, handleLoginSuccess, handleLogout } = useAuth();

    const postImage = computed(() => {
      return post.value?.image_url;
    });

    const fetchPost = async () => {
      try {
        const response = await postsApi.getPost(route.params.id);
        console.log(response.data);
        post.value = response.data;
      } catch (error) {
        console.error('게시물 로드 실패:', error);
      }
    };

    const handleEdit = () => {
      router.push(`/edit/${post.value.id}`);
    };

    const handleDelete = async () => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        try {
          await postsApi.deletePost(post.value.id);
          router.push('/home');
        } catch (error) {
          console.error('게시물 삭제 실패:', error);
        }
      }
    };

    onMounted(() => {
      checkAuth();
      fetchPost();
    });

    return {
      post,
      postImage,
      handleEdit,
      handleDelete,
      isLoggedIn,
      isLoginModalOpen,
      handleLoginSuccess,
      handleLogout
    };
  }
};