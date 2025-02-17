import { ref } from 'vue';
import { authApi } from '@/api/auth';

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close-login', 'login-success'],
  setup(props, { emit }) {
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const correct = ref(true);

    const handleLogin = async() => {
      try {
        const res = await authApi.login(email.value, password.value);
        if(res.data.status === 'success') {
          localStorage.setItem('token', res.data.token);
          
          emit('login-success');
          emit('close-login');
          email.value = '';
          password.value = '';
          error.value = '';
          correct.value = true;
        }
      } catch(err) {
        console.error("error", err);
        error.value = 'failed login'
        correct.value = false;
      }
    }

    const handleOverlayClick = () => {
      emit('close-login');
    }

    return { 
      email,
      password,
      error,
      correct,
      handleLogin,
      handleOverlayClick
    }
  }
}