import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';

const routes = [
  { path: '/', redirect: '/login' }, // 기본 경로를 로그인 페이지로 리디렉션
  { path: '/login', component: LoginView },
  { path: '/home', component: HomeView }, // '/home' 경로에서 HomeView 표시

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
