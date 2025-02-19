import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { postsApi } from '@/api/posts';
import AppHeader from '@/components/AppHeader/AppHeader.vue';

export default {
  name: 'DetailView',
  conponent: {AppHeader},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const post = ref(null);

    const postImage = computed(() => {
      return post.value?.image_url;
    });

    const handleEdit = () => {
      router.push(`/edit/${post.value.id}`);
    };

    const fetchPost = async () => {
      try {
        const response = await postsApi.getPost(route.params.id);
        console.log(response.data);
        post.value = response.data;
      } catch (error) {
        console.error('게시물 로드 실패:', error);
      }
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
      fetchPost();
    });

    return {
      post,
      postImage,
      handleEdit,
      handleDelete
    };
  }
};