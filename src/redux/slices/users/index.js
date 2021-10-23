import { createSlice } from '@reduxjs/toolkit';
import { fetchUserThunk, loginUserThunk } from './asyncThunks';

const localStorageData = JSON.parse(localStorage.getItem('userInfo'));

export const UserSlice = createSlice({
  name: 'users',
  initialState: {
    login: localStorageData?.login || '',
    name: '',
    password: '',
    profilePic: '',
    role: '',
    isLogged: localStorageData?.isLogged || false,
    users: {},
  },
  extraReducers: {
    [loginUserThunk.fulfilled]: (state, { payload: { isLogged, login, isCheckOut } }) => {
      state.isLogged = isLogged;

      if (isCheckOut) {
        localStorage.setItem('userInfo', JSON.stringify({ login, isLogged }));
      }
    },
    [fetchUserThunk.fulfilled]: (state, { payload, meta }) => {
      // eslint-disable-next-line no-param-reassign
      state.users[meta.arg] = { ...payload };
    },
  },
});

export default UserSlice.reducer;
