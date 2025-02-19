import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { postsApi } from '@/api/posts';
import AppHeader from '@/components/AppHeader/AppHeader.vue';
import LoginModal from '@/components/LoginModal/LoginModal.vue';
import { useAuth } from '@/composables/useAuth';

export default {
  name: 'EditView',
  components: { AppHeader, LoginModal },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const title = ref('');
    const content = ref('');
    const image = ref(null);
    const { isLoggedIn, isLoginModalOpen, checkAuth, handleLoginSuccess, handleLogout } = useAuth();

    const fetchPost = async () => {
      try {
        const response = await postsApi.getPost(route.params.id);
        const post = response.data;
        title.value = post.title;
        content.value = post.content;
      } catch (error) {
        console.error('게시물 로드 실패:', error);
      }
    };

    const handleUpdate = async () => {
      try {
        const formData = new FormData();
        formData.append('post[title]', title.value);
        formData.append('post[content]', content.value);
        formData.append('post[sub]', content.value.substring(0, 100) + "...");
        
        if (image.value) {
          formData.append('post[image]', image.value);
        }

        await postsApi.updatePost(route.params.id, formData);
        router.push(`/posts/${route.params.id}`);
      } catch (error) {
        console.error('게시물 수정 실패:', error);
      }
    };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        image.value = file;
      }
    };

    onMounted(() => {
      checkAuth();
      fetchPost();
    });

    return {
      title,
      content,
      handleUpdate,
      handleImageChange,
      isLoggedIn,
      isLoginModalOpen,
      handleLoginSuccess,
      handleLogout
    };
  }
};