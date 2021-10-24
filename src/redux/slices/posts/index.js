import { createSlice } from '@reduxjs/toolkit';
import { fetchPostsList } from './asyncThunks';

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
  },
});

export default PostsSlice.reducer;
