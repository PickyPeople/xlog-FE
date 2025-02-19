<template>
  <div>
    <div style="display: none">{{ console.log('HomeView - isLoggedIn:', isLoggedIn) }}</div>
    
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
    <main class="container">
      <div class="inner">
        <div class="contentBox">
          <div v-for="post in posts" :key="post.id" class="post-card">
            <img src="../../../images/postImg.png" alt="게시물 이미지" class="post-img" />
            <div class="post-content">
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-sub">{{ post.sub }}</p>
              <div class="post-footer">
                <p class="post-user">{{ post.username }}</p>
                <p class="post-date">{{ post.date }}</p>
                <img src="../../../images/heart.svg" alt="" class="heart">
                <p class="like">{{ post.likeNum }}</p>
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
