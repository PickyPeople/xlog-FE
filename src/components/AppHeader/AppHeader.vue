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
        <div class="button-group">
          <button v-if="isLoggedIn" class="new-post">새글 작성</button>
          <button 
            class="login" 
            @click="handleLoginClick"
          >
            {{ isLoggedIn ? '로그아웃' : '로그인' }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script src="./AppHeaderScript.js">

</script>

<style src="./AppHeaderStyle.css" scoped></style>