import { createSlice } from '@reduxjs/toolkit';
import { fetchPostsList, fetchPost, removePost } from './asyncThunks';

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
    [removePost.fulfilled]: (state, { payload }) => {
      const filterPosts = state.allIds.filter((id) => id !== payload);

      delete state.byId[payload];
      state.allIds = filterPosts;
    },
  },
});

export default PostsSlice.reducer;
