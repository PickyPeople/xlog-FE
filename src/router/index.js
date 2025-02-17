import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home/HomeView.vue';
import WriteView from '../views/Write/WriteView.vue';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: HomeView },
  { path: '/write', component: WriteView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
