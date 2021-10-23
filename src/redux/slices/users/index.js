import { createSlice } from '@reduxjs/toolkit';
import { loginUserThunk } from './asyncThunks';

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
  },
  extraReducers: {
    [loginUserThunk.fulfilled]: (state, { payload: { isLogged, login, isCheckOut } }) => {
      state.isLogged = isLogged;

      if (isCheckOut) {
        localStorage.setItem('userInfo', JSON.stringify({ login, isLogged }));
      }
    },
  },
});

export default UserSlice.reducer;
