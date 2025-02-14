<template>
  <header class="header">
    <div class="inner">
      <div class="menu">
        <h1 class="logo" @click="navigateHome">Xlog</h1>
        <ul class="icon">
          <li class="alarm">
            <a href="javascript:void(0)">알람</a>
          </li>
          <li class="search">
            <a href="javascript:void(0)">검색</a>
          </li>
        </ul>
        <button v-if="isLoggedIn" class="new-post">새글 작성</button>
        <button v-if="!isLoggedIn" class="login" @click="$emit('open-login')">로그인</button>
      </div>
    </div>
  </header>
</template>

<script src="./AppHeaderScript.js"></script>