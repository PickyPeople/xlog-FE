import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { postsApi } from '@/api/posts';

export default {
  name: 'WriteContent',
  emits: ['save-draft', 'publish'],
  setup() {
    const title = ref('');
    const content = ref('');
    const tags = ref([]);
    const currentTag = ref('');
    const image = ref(null);
    const router = useRouter();

    const navigateHome = () => {
      router.push('/');
    }

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        image.value = file;
      }
    };

    const addTag = () => {
      if (currentTag.value.trim() && !tags.value.includes(currentTag.value.trim())) {
        tags.value.push(currentTag.value.trim());
        currentTag.value = '';
      }
    };

    const removeTag = (index) => {
      tags.value.splice(index, 1);
    };

    const publish = async () => {
      try {
        const formData = new FormData();
        formData.append('post[title]', title.value);
        formData.append('post[content]', content.value); //본문 내용
        formData.append('post[sub]', content.value.substring(0, 100) + "..."); // content의 앞부분을 sub로 사용
        
        if (image.value) {
          formData.append('post[image]', image.value);
        }

        await postsApi.createPost(formData);
        router.push('/');
      } catch (error) {
        console.error('게시물 등록 실패:', error);
      }
    };

    return {
     title,
      content,
      tags,
      currentTag,
      addTag,
      removeTag,
      publish,
      navigateHome,
      handleImageChange
    };
  }
}