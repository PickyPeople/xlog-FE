import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home/HomeView.vue';
import WriteView from '../views/Write/WriteView.vue';
import DetailView from '../views/Detail/DetailView.vue';
import EditView from '../views/Edit/EditView.vue';
import SearchResults from '../views/Search/SearchResults.vue';

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
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchResults,
    props: (route) => ({ keyword: route.query.keyword }) // 쿼리 파라미터를 props로 전달
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
