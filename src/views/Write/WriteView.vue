<template>
  <div>
    <main class="editor-container">
      <div class="title-input">
        <input type="text" v-model="title" placeholder="タイトルを入力してください" class="title-field" />
      </div>
      <div class="image-input">
        <input type="file" @change="handleImageChange" accept="image/*" class="image-field" />
      </div>
      <div class="tag-container">
        <div class="tag-list">
          <span v-for="(tag, index) in tags" :key="index" class="tag">
            {{ tag }}
            <span @click="removeTag(index)" class="tag-remove">×</span>
          </span>
        </div>
        <input
          type="text"
          v-model="currentTag"
          @keyup.enter="addTag"
          placeholder="タグを入力して、Enterキーを押してください"
          class="tag-input"
        />
      </div>
      <div class="editor-content">
        <textarea v-model="content" placeholder="内容を入力してください…" class="content-editor"></textarea>
      </div>
      <div class="editor-footer">
        <button class="btn-save" @click="navigateHome">戻る</button>
        <button class="btn-publish" @click="publish">投稿する</button>
      </div>
    </main>
  </div>
</template>

<script src="./WriteView.js"></script>

<style src="./WriteView.css" scoped></style>
