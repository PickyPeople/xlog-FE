import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'WriteContent',
  emits: ['save-draft', 'publish'],
  setup(props, { emit }) {
    const title = ref('');
    const content = ref('');
    const tags = ref([]);
    const currentTag = ref('');
    const router = useRouter();

    const navigateHome = () => {
      router.push('/');
    }

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
        const response = await fetch('/api/posts', {  // Ruby 백엔드 API 엔드포인트
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title.value,
            content: content.value,
            tags: tags.value
          })
        });
    
        if (!response.ok) {
          throw new Error('게시물 등록에 실패했습니다');
        }
    
        // 성공 시 홈으로 이동
        router.push('/');
      } catch (error) {
        console.error('Error:', error);
        // 에러 처리 로직 추가 (예: 사용자에게 알림)
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
      navigateHome
    };
  }
}