import { createSlice } from '@reduxjs/toolkit';

export const PostsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
  },
});

export default PostsSlice.reducer;
