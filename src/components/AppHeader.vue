<template>
  <header class="header">
    <div class="inner">
      <div class="menu">
        <h1 class="logo">Xlog</h1>
        <ul class="icon">
          <li class="alarm">
            <a href="javascript:void(0)">알람</a>
          </li>
          <li class="search">
            <a href="javascript:void(0)">검색</a>
          </li>
        </ul>
        <button class="new-post">새글 작성</button>
        <button class="login">로그인</button>
      </div>
    </div>
  </header>
</template>

<script setup>
// import { ref } from "vue";

// const isLoggedIn = ref(false); // 기본값: 로그인되지 않은 상태

// const setLoggedIn = () => {
//   isLoggedIn.value = true;
// };

// const logout = () => {
//   isLoggedIn.value = false;
//   // TODO: localStorage, Vuex, Pinia 등 상태 초기화
// };

// TODO: 로그인 상태 관리 (예: Vuex, Pinia, localStorage)
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: black;
}

.header {
  height: 44px;
  transition: 0.4s;
}

.inner {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  padding: 0 4px;
  position: relative;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.menu {
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

h1 {
  flex-grow: 1;
  font-size: 1.2em;
}

.icon {
  width: 60px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.alarm {
  width: 24px;
  height: 24px;
  background-image: url("../../images/haeder_alarm.svg");
  text-indent: -9999px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.menu .search {
  width: 24px;
  height: 24px;
  background-image: url("../../images/header_search.svg");
  text-indent: -9999px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.new-post {
  padding: 3px 9px;
  background-color: #fff;
  border-radius: 30px;
  color: black;
  font-weight: 600;
}

.login {
  padding: 3px 9px;
  background-color: black;
  color: white;
  font-weight: 600;
  border-radius: 30px;
}

</style>
