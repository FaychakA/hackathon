import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/users';
import postsReducer from './slices/posts';
import commentsReducer from './slices/comments';

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});