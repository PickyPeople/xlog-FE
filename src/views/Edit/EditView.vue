<template>
  <div>
    <AppHeader 
      :is-logged-in="isLoggedIn"
      @open-login="isLoginModalOpen = true"
      @logout="handleLogout"
    />
    <LoginModal
      :is-open="isLoginModalOpen"
      @close-login="isLoginModalOpen = false"
      @login-success="handleLoginSuccess"
    />
    <main class="editor-container">
      <div class="title-input">
        <input
          type="text"
          v-model="title"
          placeholder="제목을 입력하세요"
          class="title-field"
        />
      </div>

      <div class="image-input">
        <input
          type="file"
          @change="handleImageChange"
          accept="image/*"
          class="image-field"
        />
      </div>

      <div class="editor-content">
        <textarea
          v-model="content"
          placeholder="내용을 입력해주세요..."
          class="content-editor"
        ></textarea>
      </div>

      <div class="editor-footer">
        <button class="btn-save" @click="router.push(`/posts/${$route.params.id}`)">취소</button>
        <button class="btn-publish" @click="handleUpdate">수정하기</button>
      </div>
    </main>
  </div>
</template>

<script src="./EditView.js"></script>
<style src="./EditView.css" scoped></style>