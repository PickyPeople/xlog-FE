import { useRouter } from "vue-router"

export default {
  name: 'WriteView',
  setup() {
    const router = useRouter();

    const navigateHome = () => {
      router.push('/');
    }

    return {
      navigateHome
    }
  }
}