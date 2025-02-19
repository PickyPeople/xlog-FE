<template>
  <AppHeader 
    :is-logged-in="isLoggedIn" 
    @open-login="isLoginModalOpen = true" 
    @logout="handleLogout" 
  />
  <LoginModal
    v-if="isLoginModalOpen"
    :is-open="isLoginModalOpen"
    @close-login="isLoginModalOpen = false"
    @login-success="handleLoginSuccess"
  />
  <div>
    <main class="detail-container">
      <div v-if="post" class="post-detail">
        <div class="image-container">
          <img
            :src="post.image_url || '../../../images/postImg.png'"
            :alt="post.title"
            class="detail-img"
            @error="handleImageError"
          />
        </div>
        <h1 class="detail-title">{{ post.title }}</h1>
        <div class="post-info">
          <span class="author">{{ post.username }}</span>
          <span class="date">{{ post.date }}</span>
          <span class="likes">좋아요 {{ post.likeNum }}</span>
        </div>
        <div class="content">
          {{ post.content }}
        </div>
        <div class="button-container">
          <button @click="handleEdit" class="btn edit-btn">수정하기</button>
          <button @click="handleDelete" class="btn delete-btn">삭제하기</button>
        </div>
      </div>
      <div v-else class="loading">로딩 중...</div>
    </main>
  </div>
</template>

<script src="./DetailView.js"></script>
<style src="./DetailView.css" scoped></style>
