<template>
  <div>
    <AppHeader @open-login="isLoginModalOpen = true" />
    <LoginModal :isOpen="isLoginModalOpen" @close-login="isLoginModalOpen = false" />
    <main class="container">
      <div class="inner">
        <div class="contentBox">
          <div class="content" v-for="(post, index) in posts" :key="index" >
            <div class="post">
              <div class="post-img">
                <img src="../../../images/postImg.png" alt="">
              </div>
              <div class="post-title">{{ post.title }}</div>
              <div class="post-subTitle">{{ post.sub }}</div>
              <div class="post-date">{{ post.date }}</div>
              <div class="post-comment">{{ post.comment }}</div>
            </div>
            <div class="post-explain">
              <div class="post-user">{{ post.user }}</div>
              <div class="post-like"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script src="./HomeView.js"></script>

<style src="./HomeView.css" scoped></style>
