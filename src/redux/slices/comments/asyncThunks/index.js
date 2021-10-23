import { createAsyncThunk } from '@reduxjs/toolkit';
import { writeData } from '../../../../utils/firebase';

export const createNewComment = createAsyncThunk(
  'comments/createComment',
  async ({ commentData, postId }) => {
    writeData(`posts/${postId}/comments`, commentData.commentId, commentData);
  },
);
