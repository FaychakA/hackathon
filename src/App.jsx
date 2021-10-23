import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';

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
import { Auth } from './components/Auth';

const routing = [
  {
    path: '/post/:id',
    component: Post,
    isExact: true,
    type: 'private',
  },
  {
    path: '/posts',
    component: Posts,
    isExact: true,
    type: 'private',
  },
  {
    path: '/user/:id',
    component: User,
    isExact: true,
    type: 'private',
  },
  {
    path: '/users',
    component: Users,
    isExact: true,
    type: 'private',
  },
  {
    path: '/login',
    component: Login,
    isExact: true,
    type: 'public',
  },
  {
    path: '/registration',
    component: Registration,
    isExact: true,
    type: 'public',
  },
  {
    path: '/',
    component: Home,
    isExact: true,
    type: 'private',
  },
];

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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
      <Container className="app__container" fluid>
        <BrowserRouter>
          <Switch>
            {routing.map(({
              path, exact, component, type,
            }) => (
              <Auth
                key={path}
                path={path}
                exact={exact}
                component={component}
                type={type}
              />
            ))}
          </Switch>
        </BrowserRouter>
      </Container>
    </>
  );
};
