import { ref } from 'vue';

export default {
  setup() {
    const email = ref('');

    return { email }
  }
}