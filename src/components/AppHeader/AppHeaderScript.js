import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  emits: ['open-login', 'logout'],
  setup(props, { emit }) {
    console.log('AppHeader setup - isLoggedIn:', props.isLoggedIn);
    const router = useRouter();
    const searchKeyword = ref('');
    const isSearchExpanded = ref(false);
    const searchInput = ref(null);

    const navigateHome = () => {
      router.push('/');
    };

    const navigateWrite = () => {
      router.push('/write');
    }

    const handleLoginClick = () => {
      if (props.isLoggedIn) {
        emit('logout');
      } else {
        emit('open-login');
      }
    };

    const toggleSearch = () => {
      isSearchExpanded.value = !isSearchExpanded.value;
      if (isSearchExpanded.value) {
        setTimeout(() => {
          searchInput.value?.focus();
        }, 100);
      } else {
        searchKeyword.value = '';
      }
    };

    const searchPosts = () => {
      if (searchKeyword.value.trim() !== '') {
        router.push(`/search?keyword=${encodeURIComponent(searchKeyword.value)}`);
        searchKeyword.value = '';
        isSearchExpanded.value = false;
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSearchExpanded.value) {
        isSearchExpanded.value = false;
        searchKeyword.value = '';
      }
    };

    return { 
      searchKeyword,
      isSearchExpanded,
      searchInput,
      navigateHome,
      navigateWrite,
      handleLoginClick,
      toggleSearch,
      searchPosts,
      handleKeyDown
    };
  }
};