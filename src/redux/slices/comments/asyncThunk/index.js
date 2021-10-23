import { createAsyncThunk } from '@reduxjs/toolkit';
import { readData, writeData } from '../../../../utils/firebase';

export const createNewComment = createAsyncThunk(
  'posts/createComment',
  async (commentData) => {
    writeData('comments', commentData.commentId, commentData);
  },
);

export const fetchCommentsList = createAsyncThunk(
  'posts/fetchCommentsList',
  async () => {
    const response = await readData('comments', '');
    return response;
  },
);
