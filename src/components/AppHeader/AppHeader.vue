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
              placeholder="검색어를 입력하세요"
              ref="searchInput"
            />
            <button @click="toggleSearch" class="search-icon">
              <span v-if="!isSearchExpanded">검색</span>
              <span v-else>닫기</span>
            </button>
          </div>
          <div class="alarm-contianer">
            <button class="alarm">알람</button>
          </div>
          <div class="button-group">
            <button v-if="isLoggedIn" @click="navigateWrite" class="new-post">새글 작성</button>
            <button class="login" @click="handleLoginClick">
              {{ isLoggedIn ? "로그아웃" : "로그인" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script src="./AppHeaderScript.js"></script>

<style src="./AppHeaderStyle.css" scoped></style>
