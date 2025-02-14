import { ref } from 'vue';

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close-login'],
  setup(props, { emit }) {
    const email = ref('');
    const password = ref('');

    // event 파라미터 제거
    const handleOverlayClick = () => {
      emit('close-login');
    }

    return { 
      email,
      password,
      handleOverlayClick
    }
  }
}