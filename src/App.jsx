import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { readData } from './utils/firebase';

import { loginUserThunk } from './redux/slices/users/assyncThunks';
import { createNewPost, fetchPostsList } from './redux/slices/posts/asyncThunk';
import { createNewComment } from './redux/slices/comments/asyncThunk';

import './App.scss';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    readData('users', 'pokhylko').then((res) => console.log(res));
    dispatch(loginUserThunk({
      login: 'pokhylko',
      password: 123456,
    })).then((res) => console.log('loginUserThunk', res));

    dispatch(createNewPost({
      postId: '123',
      content: 'Hello world',
    }));

    dispatch(createNewComment({
      commentData: {
        commentId: '1234',
        content: 'Hello world!!!',
      },
      postId: '123',
    }));

    dispatch(fetchPostsList()).then((res) => console.log('fetchPostsList', res));
  }, []);

  return (
    <div className="App">
      hackathon
      <ul>
        <li>Maria</li>
        <li>Anatolii</li>
        <li>Yaroslav</li>
        <li>Andrii</li>
      </ul>
    </div>
  );
};
