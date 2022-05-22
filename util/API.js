import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: `${process.env.API_URL}/api/v1/`,
  baseURL: `/api/v1/`,
  withCredentials: true,
});

const url = 'http://localhost:8800/api/v1/';
// const url = '/api/v1';

export const login = async (userCredentials) => {
  try {
    const res = await axios.post(
      `${process.env.API_URL}/api/v1/users/login`,
      userCredentials
    );
    const cookies = res.headers['set-cookie'];
    const { data } = res;
    return { data, cookies };
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || 'Something went wrong!' };
  }
};

export const signup = async (userCredentials) => {
  try {
    const res = await axiosInstance.post(`/users/signup`, userCredentials);
    const { data } = res;
    return data;
  } catch (err) {
    return { error: err.response.data.message || 'Something went wrong!' };
  }
};

export const getUser = async (user, by = 'userId') => {
  try {
    const res = await axios.get(
      `${process.env.API_URL}/api/v1/users?${by}=${user}`
    );
    return res.data;
  } catch (err) {
    return { error: err.response.data.message || 'Something went wrong!' };
  }
};

export const searchUsers = async (q, limit = 0) => {
  try {
    const res = await axiosInstance.get(`/users/search?q=${q}&limit=${limit}`);
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const getUserTimeline = async () => {
  const res = await axiosInstance.get(`/posts/timeline`, {
    withCredentials: true,
  });
  return res.data.posts;
};

export const getUserPosts = async (id) => {
  const res = await axiosInstance.get(`/posts/profile/${id}`);
  return res.data.posts;
};

export const likePost = async (postId, userId) => {
  const res = await axiosInstance.put(`/posts/${postId}/like`, { userId });
};

export const uploadFile = async (data) => {
  const res = await axiosInstance.post('/upload', data);
  return res.data?.status === 'success' ? res.data.filename : null;
};

export const addPost = async (post) => {
  const res = await axiosInstance.post('/posts', post);
  return res.data.post;
};

export const deletePost = async (postId) => {
  try {
    await axiosInstance.delete(`/posts/${postId}`);
    return true;
  } catch (err) {
    return { error: err.response.data.message || 'Something went wrong!' };
  }
};

export const updatePost = async (postId, updatedPost) => {
  try {
    await axiosInstance.put(`/posts/${postId}`, updatedPost);
    return true;
  } catch (err) {
    return { error: err.response.data.message || 'Something went wrong!' };
  }
};

export const getFriends = async (id) => {
  const res = await axiosInstance.get(`/users/friends/${id}`);
  return res.data.friends;
};

export const followUser = async (id, action) => {
  try {
    const res = await axiosInstance.put(`/users/${id}/${action}`);
    return res.data.message;
  } catch (err) {
    return {
      error:
        err.response.data.message ||
        err.response.data.data.message ||
        'Something went wrong!',
    };
  }
};

export const getConversations = async () => {
  try {
    const res = await axiosInstance.get(`/conversation`);
    return res.data.conversation;
  } catch (err) {
    console.error(err.response.data.message || err.response.data.data.message);
  }
};

export const startConversation = async (receiverId) => {
  try {
    const res = await axiosInstance.post(`/conversation`, { receiverId });
    return res.data.conversation;
  } catch (err) {
    console.error(err.response.data.message || err.response.data.data.message);
  }
};

export const getTwoUsersConv = async (userId) => {
  try {
    const res = await axiosInstance.get(`/conversation/find/${userId}`);
    return res.data.conversation;
  } catch (err) {
    console.error(err.response.data.message || err.response.data.data.message);
  }
};

export const getMessages = async (id) => {
  try {
    const res = await axiosInstance.get(`/conversation/${id}/messages`);
    return res.data.messages;
  } catch (err) {
    console.log(err);
    console.error(err.response.data.message || err.response.data.data.message);
    return [];
  }
};

export const sendMessage = async (msg) => {
  try {
    const res = await axiosInstance.post(`/conversation/messages`, msg);
    return res.data.message;
  } catch (err) {
    console.error(err.response.data.message || err.response.data.data.message);
  }
};

export const addComment = async (postId, comment) => {
  try {
    const res = await axiosInstance.post(`/posts/${postId}/comments`, comment);
    if (res.data.status === 'success') return res.data.comment;
    if (res.data.status === 'failed' || res.data.status === 'error')
      return null;
  } catch (err) {
    console.error(err.response.data.message || err.response.data.data.message);
  }
};

export const getComments = async (postId) => {
  try {
    const res = await axiosInstance.get(`/posts/${postId}/comments`);
    if (res.data.status === 'success') return res.data.comments;
    if (res.data.status === 'failed' || res.data.status === 'error')
      return null;
  } catch (err) {
    console.error(err.response.data.message || err.response.data.data.message);
  }
};

export const updateInfo = async (updatedInfo) => {
  try {
    const res = await axiosInstance.put(`/users/updateMe`, updatedInfo);
    if (res.data.status === 'success')
      return {
        status: 'success',
        msg: 'Updated Successfully!',
        user: res.data.user,
      };
    if (res.data.status === 'failed' || res.data.status === 'error')
      return {
        user: null,
        status: 'error',
        msg:
          err.response.data.message ||
          err.response.data.data.message ||
          'Something went wrong Try agian',
      };
  } catch (err) {
    console.error(err.response.data.message || err.response.data.data.message);
  }
};

export const updatePass = async (updatedPass) => {
  try {
    const res = await axiosInstance.put(`/users/updateMyPassword`, updatedPass);
    if (res.data.status === 'success')
      return {
        status: 'success',
        msg: 'Updated Successfully!',
        user: res.data.user,
      };
    if (res.data.status === 'failed' || res.data.status === 'error')
      return {
        user: null,
        status: 'error',
        msg:
          err.response.data.message ||
          err.response.data.data.message ||
          'Something went wrong Try agian',
      };
  } catch (err) {
    console.error(err.response.data.message || err.response.data.data.message);
  }
};
