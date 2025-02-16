# 課題
Ruby on RailsとVue.jsを用いたブログプラットフォームを構築していただきます。

# **課題の説明**
1. ブログ記事の管理
<ul>
 <li>記事の投稿、編集、削除機能をRailsで実装。</li>
 <li>記事にカテゴリやタグを関連付けるリレーションを構築。</li>
</ul>

2.検索・フィルタリング機能
<ul>
 <li>Vue.jsを用いて、記事をカテゴリごとにフィルタリングし、検索できる機能を実装。</li>
</ul>

3.ユーザー認証機能
<ul>
 <li>Railsで簡易的なログイン/ログアウト機能を追加。</li>
</ul>

4.レスポンシブデザイン
<ul>
 <li>フロントエンドでモバイル対応のデザインを適用。</li>
</ul>

5.任意項目（追加要素）
<ul>
 <li>単体テストまたはE2Eテストを導入。</li>
 <li>デプロイ手順のドキュメント化。</li>
</ul>

# **フォルダーの仕組み**

# **ログインモダル作り**
### AppHeader.vue
```html
 <button 
  class="login" 
  @click="handleLoginClick"
>
  {{ isLoggedIn ? 'ログアウト' : 'ログイン' }}
</button>
```
### AppHeaderScript.js
```javascript
const handleLoginClick = () => {
       if (props.isLoggedIn) {
         emit('logout');
       } else {
         emit('open-login');
       }
     };
```
### HomeView.vue
```html
 <AppHeader 
  :is-logged-in="isLoggedIn"
  @open-login="isLoginModalOpen = true"
  @logout="handleLogout"
/>
<LoginModal
  :is-open="isLoginModalOpen"
  @close-login="isLoginModalOpen = false"
  @login-success="handleLoginSuccess"
/>
```
### LoginModal.vueの一部分
```html
 <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
```

1. isLoggedInの状態によってemit関数で親のcomponentである、HomeView.vueに知らせます。
1. AppHeaderScriptでもらった、'open-login'をAppHeaderっていうcomponentでisLoginModalOpenをtrueに変えます。  
1. HomeView.vueでLoginModalというcomponentが、is-openの状態をisLoginModalOpenで管理してるため、LoginModalにv-ifを使い、LoginModalが開けます。

# **ログインとログアウト通信**
### auth.js
``` javascript
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

export const authApi = {
  login(email, password) {
    return axios.post(`${API_URL}/login`, {
      email: email,
      password: password
    })
  },

  logout() {
    return axios.post(`${API_URL}/logout`)
  }
}
```
### LoginModal.vue
``` html
  <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">e-mail</label>
          <input 
            type="email" 
            id="email"
            v-model="email"
            placeholder="e-mailを入力してください"
            required
          />
        </div>
        <div class="input-group">
          <label for="password">パスワド</label>
          <input 
            type="password"
            id="password"
            v-model="password"
            placeholder="パスワードを入力してください"
            required 
          />
        </div>
        <button type="submit" class="login-btn">로그인</button>
        <button type="button" class="register-btn">회원가입</button>
      </form>
```
### LoginModal.js
``` javascript
 const handleLogin = async() => {
      try{
        const res = await authApi.login(email.value, password.value);
        if(res.data.status == 'success') {
          emit('login-success');
          emit('close-login');
        }
      } catch(err) {
        console.error("Login error:", err);
        error.value = 'failed login'
        correct.value = false;
      }
    }
```
### HomeView.jsの一部分
```javascript
const handleLoginSuccess = () => {
      isLoggedIn.value = true; 
      isLoginModalOpen.value = false;
    };

const handleLogout = async () => {
      try {
        const response = await authApi.logout();
        
        if (response.data.status === 'success') {
          isLoggedIn.value = false;
        }
      } catch (error) {
        console.error('로그아웃 실패:', error);
      }
    };
```

1. LoginModal.vueでログインのボートンを押せば、formタグによって、LoginModal.jsのhandlelogin関数によって、auth.jsを通じてe-mailとパスワードの確認をします。
2. e-mailとパスワードがあってた場合、親のcomponentにlogin-successとclose-loginを伝えます。
3. HomeView.vueのAppHeader componentにはis-logged-inにtureを渡し、LoginModalのisLoginModalOpenをfalseに交わし、ログインモダルを閉じます。
4. AppHeader.vueはisLoggedInの状態によって、UIがログインからログアウトに変わります。
5. ログアウトを押したら、AppHeaderScript.jsにある、handleLoginClick関数によって、emit('logout')関数が実行されます。
6. HomeView.vueではlogoutをもらい、HomeView.jsのhandleLogout関数が実行されます。
7. それによって、 auth.jsのauthApiのlogout関数が実行されます。





