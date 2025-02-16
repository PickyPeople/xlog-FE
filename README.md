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

isLoggedInの状態によってemit関数で親のcomponentである、HomeView.vueに知らせます。

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
AppHeaderScriptでもらった、'open-login'をAppHeaderっていうcomponentでisLoginModalOpenをtrueに変えます。  
HomeView.vueでLoginModalというcomponentが、is-openの状態をisLoginModalOpenで管理してるため、LoginModalにv-ifを使い、LoginModalが開けます。




