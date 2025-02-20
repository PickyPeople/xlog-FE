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
        <div class="tags-container">
          <span v-for="tag in post.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
        <div class="post-info">
          <span class="author">{{ post.username }}</span>
          <span class="date">{{ post.date }}</span>
          <span class="likes"> ❤️{{ post.likeNum }}</span>
        </div>
        <div class="content">
          {{ post.content }}
        </div>
        <div  v-if="isAuthor" class="button-container">
          <button @click="handleEdit" class="btn edit-btn">修正する</button>
          <button @click="handleDelete" class="btn delete-btn">削除する</button>
        </div>
      </div>
      <div v-else class="loading">読み込み中...</div>
    </main>
  </div>
</template>

<script src="./DetailView.js"></script>
<style src="./DetailView.css" scoped></style>
