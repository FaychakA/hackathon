import { createSlice } from '@reduxjs/toolkit';
import { fetchPostsList, fetchPost } from './asyncThunks';

export const PostsSlice = createSlice({
  name: 'posts',
  initialState: {
    byId: {},
    allIds: [],
  },
  extraReducers: {
    [fetchPostsList.fulfilled]: (state, { payload }) => {
      state.byId = payload;
      state.allIds = Object.keys(payload);
    },
    [fetchPost.fulfilled]: (state, { payload }) => {
      state.byId[payload.postId] = payload;
      state.allIds.push(payload.postId);
    },
  },
});

export default PostsSlice.reducer;
