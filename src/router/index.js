import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home/HomeView.vue';
import WriteView from '../views/Write/WriteView.vue';
import DetailView from '../views/Detail/DetailView.vue';
import EditView from '../views/Edit/EditView.vue';

const routes = [
  { path: '/', redirect: '/home' },
  { 
    path: '/home', 
    name: 'Home',
    component: HomeView 
  },
  { 
    path: '/write', 
    name: 'Write',
    component: WriteView 
  },
  { 
    path: '/posts/:id', 
    name: 'Detail',
    component: DetailView 
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: EditView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
