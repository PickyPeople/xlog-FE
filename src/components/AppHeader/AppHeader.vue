<template>
  <header class="header">
    <div class="inner">
      <div class="menu">
        <h1 class="logo" @click="navigateHome">Xlog</h1>
        <div class="right-menu">
          <div class="search-container" :class="{ expanded: isSearchExpanded }">
            <input
              type="text"
              v-model="searchKeyword"
              @keyup.enter="searchPosts"
              @keydown="handleKeyDown"
              placeholder="検索ワード"
              ref="searchInput"
            />
            <button @click="toggleSearch" class="search-icon">
              <span v-if="!isSearchExpanded">検索</span>
              <span v-else>x</span>
            </button>
          </div>
          <div class="alarm-contianer">
            <button class="alarm">アラーム</button>
          </div>
          <div class="button-group">
            <button v-if="isLoggedIn" @click="navigateWrite" class="new-post">新規投稿</button>
            <button class="login" @click="handleLoginClick">
              {{ isLoggedIn ? "ログアウト" : "ログイン" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script src="./AppHeaderScript.js"></script>

<style src="./AppHeaderStyle.css" scoped></style>
