<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close-login')">
    <div class="modal">
      <h2>로그인</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="이메일" required />
        <input v-model="password" type="password" placeholder="비밀번호" required />
        <button type="submit">로그인</button>
      </form>
      <button @click="$emit('close-login')" class="close-btn">닫기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const email = ref('');
const password = ref('');

defineProps({ isOpen: Boolean }); // ✅ props는 필요하지만 변수로 할당할 필요 없음
const emit = defineEmits(['close-login']);

const handleLogin = () => {
  console.log('로그인 시도:', email.value, password.value);
  emit('close-login'); // 로그인 후 모달 닫기
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

input {
  width: 100%;
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background: #0056b3;
}

.close-btn {
  background: gray;
}
</style>
