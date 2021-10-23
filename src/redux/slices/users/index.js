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
    bannedUsers: [],
  },
  reducers: {
    changeBanStatus: (state, { payload }) => {
      if (state.bannedUsers.includes(payload)) {
        // eslint-disable-next-line no-param-reassign
        state.bannedUsers = state.bannedUsers.filter((id) => id !== payload);
      } else {
        // eslint-disable-next-line no-param-reassign
        state.bannedUsers.push(payload);
      }
    },
  },
  extraReducers: {
    [loginUserThunk.fulfilled]: (state, { payload: { isLogged, login, isCheckOut } }) => {
      if (!state.bannedUsers.includes(login)) {
        // eslint-disable-next-line no-param-reassign
        state.isLogged = isLogged;

        if (isCheckOut) {
          localStorage.setItem('userInfo', JSON.stringify({ login, isLogged }));
        }
      }
    },
    [fetchUserThunk.fulfilled]: (state, { payload, meta }) => {
      // eslint-disable-next-line no-param-reassign
      state.users[meta.arg] = { ...payload };
    },
    [fetchUsersIdsThunk.fulfilled]: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.allIds = [...payload];
    },
  },
});

export const { changeBanStatus } = UserSlice.actions;

export default UserSlice.reducer;
