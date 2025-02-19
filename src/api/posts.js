// src/api/posts.js
import axios from 'axios';

export const postsApi = {
  // 전체 게시물 목록 조회
  getAllPosts: () => {
    return axios.get('http://localhost:3000/api/posts');
  },

  // 새 게시물 작성
  createPost: (postData) => {
    return axios.post('http://localhost:3000/api/posts', { post: postData });
  },

  // 특정 게시물 조회
  getPost: (postId) => {
    return axios.get(`http://localhost:3000/api/posts/${postId}`);
  },

  // 게시물 수정
  updatePost: (postId, postData) => {
    return axios.put(`http://localhost:3000/api/posts/${postId}`, { post: postData });
  },

  // 게시물 삭제
  deletePost: (postId) => {
    return axios.delete(`http://localhost:3000/api/posts/${postId}`);
  }
};