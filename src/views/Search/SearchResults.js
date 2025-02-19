import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { postsApi } from '../../api/posts';

export default {
  setup() {
    const route = useRoute();
    const keyword = ref(route.query.keyword);
    const searchResults = ref([]);

    onMounted(async () => {
      try {
        const response = await postsApi.searchPosts(keyword.value);
        searchResults.value = response.data;
        console.log(searchResults.value);
      } catch (error) {
        console.error('검색 결과를 가져오는 중 오류 발생:', error);
      }
    });

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('ko-KR', options);
    };

    return {
      keyword,
      searchResults,
      formatDate
    };
  },
};