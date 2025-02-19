import axios from 'axios';

export const postsApi = {
  getAllPosts: () => {
    return axios.get('http://localhost:3000/api/posts');
  },

  createPost: (formData) => {
    const token = localStorage.getItem('token');
    // FormData에 태그 배열 추가
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
    // FormData에 태그 배열 추가
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
  }
};