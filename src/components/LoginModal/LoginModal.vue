<template>
  <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content"  @click.stop>
      <h2>Xlog</h2>
      <form action="">
        <div class="input-group">
          <label for="email">이메일</label>
          <input 
            type="email" 
            id="email"
            v-model="email"
            placeholder="이메일을 입력해주세요"
            required
          />
        </div>
        <div class="input-group">
          <label for="password">비밀번호</label>
          <input 
            type="password"
            id="password"
            v-model="password"
            placeholder="비밀번호를 입력하세요"
            required 
          />
        </div>
        <button type="submit" class="login-btn">로그인</button>
        <button type="button" class="register-btn">회원가입</button>
      </form>
    </div>
  </div>
</template>

<script src="./LoginModal.js">
</script>

<style src="./LoginModal.css">
</style>