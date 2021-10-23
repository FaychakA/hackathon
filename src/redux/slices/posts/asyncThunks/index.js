import { createAsyncThunk } from '@reduxjs/toolkit';
import { readData, writeData } from '../../../../utils/firebase';

export const createNewPost = createAsyncThunk(
  'posts/createPost',
  async (postsData) => {
    writeData('posts', postsData.postId, postsData);
  },
);

export const fetchPostsList = createAsyncThunk(
  'posts/fetchPostsList',
  async () => {
    let response = await readData('posts', '');
    response = Object.values(response);
    response = response.map((post) => {
      // eslint-disable-next-line no-param-reassign
      post.comments = Object.values(post?.comments);
      return post;
    });
    return response;
  },
);

export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (postId) => {
    const response = await readData('posts', postId);
    return response;
  },
);
