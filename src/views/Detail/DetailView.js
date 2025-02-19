import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { postsApi } from '@/api/posts';

export default {
  name: 'DetailView',
  setup() {
    const route = useRoute();
    const post = ref(null);

    const fetchPost = async () => {
      try {
        const response = await postsApi.getPost(route.params.id);
        console.log(response.data);
        post.value = response.data;
      } catch (error) {
        console.error('게시물 로드 실패:', error);
      }
    };

    onMounted(() => {
      fetchPost();
    });

    return {
      post
    };
  }
};