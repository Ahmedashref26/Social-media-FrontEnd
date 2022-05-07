import axios from 'axios';

const url = 'http://localhost:8800/api/v1';
// const url = '/api/v1';

export const login = async (userCredentials) => {
  const res = await axios.post(`${url}/users/login`, userCredentials);
  const cookies = res.headers['set-cookie'];
  const { data } = res;
  return { data, cookies };
};

export const signup = async (userCredentials) => {
  const res = await axios.post(`${url}/users/signup`, userCredentials);
  const { data } = res;
  return data;
};

export const getUser = async (user, by = 'userId') => {
  try {
    const res = await axios.get(`${url}/users?${by}=${user}`);
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const getUserTimeline = async () => {
  const res = await axios.get(`/api/v1/posts/timeline`, {
    withCredentials: true,
  });
  return res.data.posts;
};

export const getUserPosts = async (id) => {
  const res = await axios.get(`/api/v1/posts/profile/${id}`);
  return res.data.posts;
};

export const likePost = async (postId, userId) => {
  const res = await axios.put(`/api/v1/posts/${postId}/like`, { userId });
};

export const uploadFile = async (data) => {
  const res = await axios.post('/api/v1/upload', data);
  return res.data.filename;
};

export const addPost = async (post) => {
  const res = await axios.post('/api/v1/posts', post);
  return res.data.post;
};

export const getFriends = async (id) => {
  const res = await axios.get(`/api/v1/users/friends/${id}`);
  return res.data.friends;
};

export const followUser = async (id, action) => {
  try {
    const res = await axios.put(`/api/v1/users/${id}/${action}`);
    console.log(res.data.message);
    return res.data.message;
  } catch (err) {
    console.error(err.response.data.message);
  }
};
