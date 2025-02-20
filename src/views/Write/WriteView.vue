<template>
  <div>
    <main class="editor-container">
      <div class="title-input">
        <input type="text" v-model="title" placeholder="제목을 입력하세요" class="title-field" />
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
          placeholder="태그를 입력후 엔터를 누르세요"
          class="tag-input"
        />
      </div>
      <div class="editor-content">
        <textarea v-model="content" placeholder="내용을 입력해주세요..." class="content-editor"></textarea>
      </div>
      <div class="editor-footer">
        <button class="btn-save" @click="navigateHome">뒤로가기</button>
        <button class="btn-publish" @click="publish">출간하기</button>
      </div>
    </main>
  </div>
</template>

<script src="./WriteView.js"></script>

<style src="./WriteView.css" scoped></style>
