<template>
  <div>
    <AppHeader :is-logged-in="isLoggedIn" @open-login="isLoginModalOpen = true" @logout="handleLogout" />
    <LoginModal
      :is-open="isLoginModalOpen"
      @close-login="isLoginModalOpen = false"
      @login-success="handleLoginSuccess"
    />
    <main class="editor-container">
      <div class="title-input">
        <input type="text" v-model="title" placeholder="タイトルを入力してください" class="title-field" />
      </div>

      <div class="image-input">
        <input type="file" @change="handleImageChange" accept="image/*" class="image-field" />
      </div>

      <div class="tag-container">
        <div class="tag-list">
          <span v-for="(tag, index) in tags" :key="index" class="tag">
            {{ tag }}
            <span class="tag-remove" @click="removeTag(index)">×</span>
          </span>
        </div>
        <input
          v-model="currentTag"
          type="text"
          class="tag-input"
          placeholder="タグを入力して、Enterキーを押してください"
          @keydown.enter.prevent="addTag"
        />
      </div>

      <div class="editor-content">
        <textarea v-model="content" placeholder="内容を入力してください…" class="content-editor"></textarea>
      </div>

      <div class="editor-footer">
        <button class="btn-save" @click="editCancel">キャンセル</button>
        <button class="btn-publish" @click="handleUpdate">編集する</button>
      </div>
    </main>
  </div>
</template>

<script src="./EditView.js"></script>
<style src="./EditView.css" scoped></style>
