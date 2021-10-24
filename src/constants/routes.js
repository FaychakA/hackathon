import Post from '../pages/Post';
import Posts from '../pages/Posts';
import User from '../pages/User';
import Users from '../pages/Users';
import Profile from '../pages/Profile';
import { Login } from '../pages/Login';
import { SignUp } from '../pages/SignUp';
import Home from '../pages/Home';

export const ROUTES = [
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
    path: '/profile',
    component: Profile,
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
    path: '/sign-up',
    component: SignUp,
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
