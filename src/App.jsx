import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { readData } from './utils/firebase';

import { loginUserThunk } from './redux/slices/users/asyncThunks';
import { createNewPost, fetchPostsList } from './redux/slices/posts/asyncThunks';
import { createNewComment } from './redux/slices/comments/asyncThunks';

import './App.scss';

import Home from './pages/Home';
import Posts from './pages/Posts';
import Post from './pages/Post';
import User from './pages/User';
import Users from './pages/Users';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { Header } from './components/Header';

const routing = [
  {
    path: '/post/:id',
    component: Post,
    isExact: true,
  },
  {
    path: '/posts',
    component: Posts,
    isExact: true,
  },
  {
    path: '/user/:id',
    component: User,
    isExact: true,
  },
  {
    path: '/users',
    component: Users,
    isExact: true,
  },
  {
    path: '/login',
    component: Login,
    isExact: true,
  },
  {
    path: '/registration',
    component: Registration,
    isExact: true,
  },
  {
    path: '/',
    component: Home,
    isExact: true,
  },
];

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
    <>
      <Header />
      <Container>
        <BrowserRouter>
          <Switch>
            {routing.map((it) => (
              <Route
                path={it.path}
                exact={it.exact}
                component={it.component}
              />
            ))}
          </Switch>
        </BrowserRouter>
      </Container>
    </>
  );
};
