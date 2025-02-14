import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const isLoggedIn = ref(false);
    const router = useRouter(); // setup 내부에서 호출해야 함!

    const navigateHome = () => {
      router.push('/'); // 이제 문제없이 작동
    };

    const setLoggedIn = () => { isLoggedIn.value = true; };
    const logout = () => { isLoggedIn.value = false; };

    defineEmits; ['open-login']

    return { isLoggedIn, navigateHome, setLoggedIn, logout };
  }
};
