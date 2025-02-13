<template>
  <div>
    <AppHeader @open-login="isLoginModalOpen = true" />
    <LoginModal
      :isOpen="isLoginModalOpen"
      @close-login="isLoginModalOpen = false"
    />
    <main class="container">
      <div class="inner">
        <div class="contentBox">
          <div v-for="post in posts" :key="post.id" class="post-card">
            <img src="../../../images/postImg.png" alt="게시물 이미지" class="post-img" />
            <div class="post-content">
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-sub">{{ post.sub }}</p>
              <div class="post-footer">
                <span class="post-user">{{ post.user }}</span>
                <span>{{ post.date }}</span>
                <img src="../../../images/heart.svg" alt="" class="heart">
                <span class="like">{{ post.likeNum }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script src="./HomeView.js"></script>

<style src="./HomeView.css" scoped></style>
