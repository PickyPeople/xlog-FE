import { ref } from 'vue';
import { authApi } from '@/api/auth';

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  emits: ['close-login', 'login-success'],
  setup(props, { emit }) { //props는 LoginModal.vue에서 받기 위해 작성해 둔 것
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const correct = ref(true);

    const handleLogin = async() => {
      try{
        const res = await authApi.login(email.value, password.value);
        if(res.data.status == 'success') {
          console.log('로그인 성공, 이벤트 발생 전'); // 추가
          emit('login-success');
          emit('close-login');
          console.log('로그인 성공, 이벤트 발생 후'); // 추가
        }
      } catch(err) {
        console.error("Login error:", err);
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