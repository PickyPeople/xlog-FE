<template>
  <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content"  @click.stop>
      <h2>Xlog</h2>
      <p v-if="!correct">メールアドレスまたはパスワードを再確認してください。</p>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">メールアドレス</label>
          <input 
            type="email" 
            id="email"
            v-model="email"
            placeholder="メールアドレスを入力してください。"
            required
          />
        </div>
        <div class="input-group">
          <label for="password">パスワード</label>
          <input 
            type="password"
            id="password"
            v-model="password"
            placeholder="パスワードを入力してください。"
            required 
          />
        </div>
        <button type="submit" class="login-btn">ログイン</button>
        <button type="button" class="register-btn">新規登録</button>
      </form>
    </div>
  </div>
</template>

<script src="./LoginModal.js">
</script>

<style src="./LoginModal.css" scoped>
</style>