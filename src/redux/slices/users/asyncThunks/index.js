import { createAsyncThunk } from '@reduxjs/toolkit';
import { readData, writeData } from '../../../../utils/firebase';

export const loginUserThunk = createAsyncThunk(
  'auth/login/loginUser',
  async ({ login, password, isCheckOut }) => {
    const response = await readData('users', login);

    return {
      isLogged: response.password === password,
      login,
      isCheckOut,
    };
  },
);

export const registerUserThunk = createAsyncThunk(
  'register/registerUser',
  async (userData) => {
    // eslint-disable-next-line no-param-reassign
    userData.role = 'user';
    writeData('users', userData.login, userData);
  },
);

export const fetchUserThunk = createAsyncThunk(
  'users/fetchUser',
  async (login) => {
    const response = await readData('users', login);
    return response;
  },
);

export const fetchUsersIdsThunk = createAsyncThunk(
  'users/fetchUsersIds',
  async () => {
    const response = await readData('users', '');
    return Object.keys(response);
  },
);
