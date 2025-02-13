import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 라우터 불러오기

const app = createApp(App); // 앱 인스턴스 생성

app.use(router); // 라우터 적용
app.mount('#app'); // Vue 앱 마운트
