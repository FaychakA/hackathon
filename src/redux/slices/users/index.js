import { createSlice } from '@reduxjs/toolkit';
import { fetchUsersIdsThunk, fetchUserThunk, loginUserThunk } from './asyncThunks';

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
    allIds: [],
  },
  extraReducers: {
    [loginUserThunk.fulfilled]: (state, { payload: { isLogged, login, isCheckOut } }) => {
      // eslint-disable-next-line no-param-reassign
      state.isLogged = isLogged;

      if (isCheckOut) {
        localStorage.setItem('userInfo', JSON.stringify({ login, isLogged }));
      }
    },
    [fetchUserThunk.fulfilled]: (state, { payload, meta }) => {
      // eslint-disable-next-line no-param-reassign
      state.users[meta.arg] = { ...payload };
    },
    [fetchUsersIdsThunk.fulfilled]: (state, { payload }) => {
      console.log('payload Ids', payload);
      // eslint-disable-next-line no-param-reassign
      state.allIds = [...payload];
    },
  },
});

export default UserSlice.reducer;
