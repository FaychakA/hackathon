import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { readData } from './utils/firebase';

import { loginUserThunk } from './redux/slices/users/assyncThunks';

import './App.scss';

import Home from './pages/Home';
import Posts from './pages/Posts';
import Post from './pages/Post';
import User from './pages/User';
import Users from './pages/Users';
import Login from './pages/Login';
import Registration from './pages/Registration';

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
    })).then((res) => console.log(res));

    dispatch(loginUserThunk()).then((res) => console.log(res));
  }, []);

  return (
    <>
      <div>
        <p>Header</p>
      </div>
      <div className="wrapper">
        <div>Navigation</div>
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
      </div>
    </>
  );
};
