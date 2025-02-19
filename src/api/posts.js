import axios from 'axios';

export const postsApi = {
  getAllPosts: () => {
    return axios.get('http://localhost:3000/api/posts');
  },

  createPost: (formData) => {
    const token = localStorage.getItem('token');
    return axios.post('http://localhost:3000/api/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  getPost: (postId) => {
    return axios.get(`http://localhost:3000/api/posts/${postId}`);
  },

  updatePost: (postId, formData) => {
    return axios.put(`http://localhost:3000/api/posts/${postId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  deletePost: (postId) => {
    return axios.delete(`http://localhost:3000/api/posts/${postId}`);
  }
};