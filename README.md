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

# **ログインとログアウト**

### フロントエンドコード

**1. API通信の設定**
```javascript
 // src/api/auth.js
import axios from 'axios';

// APIリクエストにトークンを追加するインターセプター
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (email, password) => {
    return axios.post('http://localhost:3000/api/login', { email, password });
  },

  logout: () => {
    localStorage.removeItem('token');  
    return axios.post('http://localhost:3000/api/logout');
  },

  me: () => {
    return axios.get('http://localhost:3000/api/me');
  }
};
```

**2. ログイン状態の管理**
```javascript
// src/composalbes/useAuth.js
export function useAuth() {
  const isLoggedIn = ref(false);
  const isLoginModalOpen = ref(false);
  const currentUser = ref(null);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await authApi.me();
        if (res.data.status === 'success') {
          isLoggedIn.value = true;
          currentUser.value = res.data.username || res.data.user?.username;
          console.log('설정된 currentUser:', currentUser.value);
        }
      }
    } catch (error) {
      console.error('인증 확인 실패:', error);
      localStorage.removeItem('token');
      isLoggedIn.value = false;
      currentUser.value = null;
    }
  };

  const handleLoginSuccess = () => {
    isLoggedIn.value = true;
    isLoginModalOpen.value = false;
    checkAuth();
  };

  const handleLogout = async () => {
    try {
      const response = await authApi.logout();
      if (response.data.status === 'success') {
        isLoggedIn.value = false;
        currentUser.value = null; 
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return {
    isLoggedIn,
    isLoginModalOpen,
    currentUser, 
    checkAuth,
    handleLoginSuccess,
    handleLogout
  };
}
```

### バッグエンド

**1. ユーザー認証システムの実装**
```ruby
 # Gemfile
 gem 'jwt'     # JWTトークンの生成と検証
 gem 'bcrypt'  # パスワードの暗号化
```

**2. データベース設定**
```ruby
 # Userモデルの作成
rails generate model User email:string password_digest:string username:string

# app/models/user.rb
class User < ApplicationRecord
  has_many :posts, dependent: :destroy  # ユーザーが削除されれば、記事も一緒に削除
  has_secure_password # パスワードを暗号化するためのメソッドex)test1234 => 324kjdkjdas このように暗号化される。
  validates :email, presence: true, uniqueness: true # メール有効性検査presenceはrequired、uniquenessは重複できないという意味
  validates :username, presence: true, uniqueness: true 
end
```

**3. APIエンドポイントの実装**
```ruby
 # config/routes.rb
Rails.application.routes.draw do
  namespace :api do
    post '/login', to: 'auth#login'
    post '/logout', to: 'auth#logout'
    get '/me', to: 'auth#me'

  
    resources :posts do
      collection do
        get 'search'
      end
    end
  end
end
```

**主な機能**
 1. 安全なユーザー認証
    <ul>
     <li>bcryptを使用したパスワードの暗号化</li>
     <li>JWTによるトークンベースの認証</li>
    </ul>
2. 状態の維持
    <ul>
     <li>localStorageを使用したトークンの保存</li>
     <li>ページ更新時もログイン状態を維持</li>
    </ul>
3. セキュリティ
   <ul>
    <li>暗号化されたパスワードの保存</li>
    <li>トークンベースの安全な認証システム</li>
   </ul>
4. ユーザーエクスペリエンス
   <ul>
    <li>ログイン状態に応じたUI変更</li>
    <li>自動ログイン状態確認</li>
   </ul>

# **ブログの記事 投稿、修正、削除**

### フロントエンド

**1. API通信設定**
```javascript
//src/api/posts.js

 export const postsApi = {
  getAllPosts: () => {
    return axios.get('http://localhost:3000/api/posts');
  },

  createPost: (formData) => {
    const token = localStorage.getItem('token');
    if (formData.get('post[tags][]') === null && formData.get('tags')) {
      const tags = formData.get('tags');
      formData.delete('tags');
      tags.forEach(tag => {
        formData.append('post[tags][]', tag);
      });
    }

    return axios.post('http://localhost:3000/api/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  updatePost: (postId, formData) => {
    const token = localStorage.getItem('token');
    if (formData.get('post[tags][]') === null && formData.get('tags')) {
      const tags = formData.get('tags');
      formData.delete('tags');
      tags.forEach(tag => {
        formData.append('post[tags][]', tag);
      });
    }

    return axios.put(`http://localhost:3000/api/posts/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  getPost: (postId) => {
    return axios.get(`http://localhost:3000/api/posts/${postId}`);
  },

  deletePost: (postId) => {
    const token = localStorage.getItem('token');
    return axios.delete(`http://localhost:3000/api/posts/${postId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  searchPosts: (keyword) => {
    return axios.get(`http://localhost:3000/api/posts/search?keyword=${encodeURIComponent(keyword)}`);
  }
};
```

**2. 投稿作成コンポーネント**iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii____________
iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii




