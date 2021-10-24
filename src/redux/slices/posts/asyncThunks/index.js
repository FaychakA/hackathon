import { createAsyncThunk } from '@reduxjs/toolkit';
import { readData, writeData, removeData } from '../../../../utils/firebase';

export const createNewPost = createAsyncThunk(
  'posts/createPost',
  async (postsData) => {
    writeData('posts', postsData.postId, postsData);
  },
);

export const fetchPostsList = createAsyncThunk(
  'posts/fetchPostsList',
  async () => {
    const response = await readData('posts', '');
    return response;
  },
);

export const removePost = createAsyncThunk(
  'posts/removePost',
  async (postId) => {
    const response = await removeData('posts', postId);

    return response;
  },
);

export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (postId) => {
    const response = await readData('posts', postId);

    return response;
  },
  {
    condition: (postId, { getState }) => {
      const { byId } = getState().posts;

      if (Object.keys(byId).includes(postId)) {
        return false;
      }

      return true;
    },
  },
);
