import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/user';
import usersReducer from './slices/users';
import postsReducer from './slices/posts';
import commentsReducer from './slices/comments';

export default configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});
