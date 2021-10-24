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
    if (!userData?.role) {
      userData.role = 'user';
    }
    writeData('users', userData.login, userData);
    return userData;
  },
);
