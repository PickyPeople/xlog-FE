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

    return { 
      navigateHome,
      navigateWrite,
      handleLoginClick
    };
  }
};