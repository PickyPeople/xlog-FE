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

# Xlog - ブログプラットフォーム

Vue.jsとRuby on Railsを使用したブログプラットフォームプロジェクトです。

## 目次
1. [技術スタック](#技術スタック)
2. [主要機能](#主要機能)
3. [プロジェクト構造](#プロジェクト構造)
4. [機能別コード実装](#機能別コード実装)
5. [インストールと実行方法](#インストールと実行方法)
6. [API仕様書](#api仕様書)

## 技術スタック

### フロントエンド
- Vue.js 3 (Composition API)
- Vue Router
- JWT認証
- FormDataの処理

### バックエンド
- Ruby on Rails (APIモード)
- Active Storage (画像処理)
- JWT認証
- PostgreSQL

## 主要機能

### 1. ユーザー管理
- JWT基盤の認証
- ログイン/ログアウト
- ユーザー権限管理
- セキュリティ処理

### 2. 投稿管理
- CRUD (作成、読み取り、更新、削除)
- 画像アップロード
- タグシステム
- 権限基盤の投稿管理

### 3. 検索システム
- 統合検索（タイトル、タグ）
- リアルタイム検索UI
- 検索結果ページ
- タグベースのフィルタリング

## 機能別コード実装

### 1. ユーザー認証システム

#### バックエンド (AuthController)
```ruby
module Api
  class AuthController < ApplicationController
    def login
      user = User.find_by(email: params[:email])
      
      if user&.authenticate(params[:password])
        token = JWT.encode(
          { user_id: user.id, exp: 24.hours.from_now.to_i },
          Rails.application.credentials.secret_key_base
        )
        render json: { 
          status: 'success',
          token: token,
          user: { email: user.email }
        }
      else
        render json: { 
          status: 'error', 
          message: 'ログインに失敗しました' 
        }, status: :unauthorized
      end
    end
  end
end
```

#### フロントエンド (LoginModal)
```javascript
export default {
  setup(props, { emit }) {
    const email = ref('');
    const password = ref('');

    const handleLogin = async() => {
      try {
        const res = await authApi.login(email.value, password.value);
        if(res.data.status === 'success') {
          localStorage.setItem('token', res.data.token);
          emit('login-success');
          emit('close-login');
        }
      } catch(err) {
        console.error("エラー:", err);
        error.value = 'ログインに失敗しました'
      }
    };
  }
}
```

### 2. 投稿CRUD

#### バックエンド (PostsController)
```ruby
module Api
  class PostsController < ApplicationController
    before_action :authenticate_user, only: [:create, :update, :destroy]
    before_action :set_post, only: [:show, :update, :destroy]
    before_action :check_post_owner, only: [:update, :destroy]
 
    def create
      @post = Post.new(post_params.except(:tags))
      @post.user = current_user
      @post.date = Date.today
      
      if @post.save
        if params[:post][:tags].present?
          params[:post][:tags].each do |tag_name|
            tag = Tag.find_or_create_by(name: tag_name)
            @post.tags << tag
          end
        end
        render json: @post, status: :created
      else
        render json: { error: @post.errors.full_messages }, 
               status: :unprocessable_entity
      end
    end
  end
end
```

#### フロントエンド (WriteView)
```javascript
export default {
  name: 'WriteContent',
  setup() {
    const title = ref('');
    const content = ref('');
    const tags = ref([]);
    const image = ref(null);

    const publish = async () => {
      try {
        const formData = new FormData();
        formData.append('post[title]', title.value);
        formData.append('post[content]', content.value);
        
        const sub = content.value.length > 100 
          ? content.value.substring(0, 100) + "..."
          : content.value;
        
        formData.append('post[sub]', sub);
        
        if (image.value) {
          formData.append('post[image]', image.value);
        }

        tags.value.forEach(tag => {
          formData.append('post[tags][]', tag);
        });
    
        await postsApi.createPost(formData);
        router.push('/');
      } catch (error) {
        console.error('投稿の作成に失敗しました:', error);
      }
    };
  }
}
```

### 3. 検索システム

#### バックエンド (検索ロジック)
```ruby
def search
  keyword = params[:keyword]
  @posts = Post.joins(:tags)
               .where("posts.title LIKE ? OR tags.name LIKE ?", 
                     "%#{keyword}%", "%#{keyword}%")
               .distinct
  render json: @posts
end
```

#### フロントエンド (検索実装)
```javascript
export default {
  setup(props, { emit }) {
    const searchKeyword = ref('');
    const isSearchExpanded = ref(false);

    const searchPosts = () => {
      if (searchKeyword.value.trim() !== '') {
        router.push(`/search?keyword=${encodeURIComponent(searchKeyword.value)}`);
        searchKeyword.value = '';
        isSearchExpanded.value = false;
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSearchExpanded.value) {
        isSearchExpanded.value = false;
        searchKeyword.value = '';
      }
    };
  }
}
```

## データベース構造

```mermaid
erDiagram
    User ||--o{ Post : "has many"
    Post ||--o{ PostTag : "has many"
    Tag ||--o{ PostTag : "has many"
    Post ||--o| Image : "has one"

    User {
        string username
        string email
        string password_digest
    }

    Post {
        string title
        string content
        string sub
        datetime created_at
        datetime updated_at
        bigint user_id
    }

    Tag {
        string name
        datetime created_at
        datetime updated_at
    }

    PostTag {
        bigint post_id
        bigint tag_id
    }
```

## コードレビューポイント

### 1. セキュリティ
- [x] ユーザー認証の実装
- [x] 権限チェックの実装
- [x] JWTトークン管理

### 2. パフォーマンス
- [x] 画像処理の最適化
- [x] 検索クエリの最適化
- [ ] N+1クエリ問題の解決が必要

### 3. ユーザー体験
- [x] 検索UI/UX
- [x] レスポンシブデザイン
- [x] エラー処理とフィードバック

## 今後の改善点
1. 検索パフォーマンスの最適化
   - 全文検索エンジンの導入検討
   - キャッシュの適用
2. テストコードの作成
3. CI/CDパイプラインの構築



