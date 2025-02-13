<template>
  <div>
    <AppHeader @open-login="isLoginModalOpen = true" />
    <LoginModal :isOpen="isLoginModalOpen" @close-login="isLoginModalOpen = false" />
    <main class="content">
      <h1>블로그 홈 화면</h1>
      <p>Velog처럼 로그인하지 않아도 볼 수 있는 화면</p>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppHeader from '@/components/AppHeader/AppHeader.vue';  
import LoginModal from '@/components/LoginModal.vue';

const isLoginModalOpen = ref(false);
</script>

<style scoped>
.content {
  text-align: center;
  margin-top: 50px;
}
</style>
