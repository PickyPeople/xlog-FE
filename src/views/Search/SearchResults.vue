<template>
  <div class="search-results">
    <h2 class="search-results__title">検索結果</h2>
    <p v-if="searchResults.length === 0" class="search-results__empty">検索結果がありません。</p>
    <ul v-else class="search-results__list">
      <li v-for="post in searchResults" :key="post.id" class="search-results__item">
        <router-link :to="`/posts/${post.id}`" class="search-results__link">
          <img v-if="post.image_url" :src="post.image_url" alt="게시물 이미지" class="search-results__image" />

          <div class="search-results__content">
            <h3 class="search-results__title">{{ post.title }}</h3>
            <p class="search-results__meta">
              {{ post.username }} · {{ formatDate(post.date) }}
            </p>
            <p class="search-results__description">{{ post.sub }}</p>

            <div class="search-results__tags">
              <span v-for="tag in post.tags" :key="tag" class="search-results__tag">#{{ tag }}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script src="./SearchResults.js"></script>

<style src="./SearchResults.css" scoped></style>