import { createSlice } from '@reduxjs/toolkit';

export const CommentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
  },
});

export default CommentsSlice.reducer;
