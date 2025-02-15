import { ref } from 'vue';
import { authApi } from '@/api/auth';

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close-login'],
  setup(props, { emit }) { //props는 LoginModal.vue에서 받기 위해 작성해 둔 것
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const correct = ref(true);

    const handleLogin = async() => {
      try{
        const res = await authApi.login(email.value, password.value);
        if(res.data.status == 'success') {
          emit('close-login');
        }
      } catch(err) {
        console.log("error");
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