import { createSlice } from '@reduxjs/toolkit';
import { loginUserThunk } from './asyncThunks';

const localStorageData = JSON.parse(localStorage.getItem('userInfo'));

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    login: localStorageData?.login || '',
    name: '',
    password: '',
    profilePic: '',
    role: '',
    isLogged: localStorageData?.isLogged || false,
    bannedUsers: [],
  },
  reducers: {
    changeBanStatus: (state, { payload }) => {
      if (state.bannedUsers.includes(payload)) {
        state.bannedUsers = state.bannedUsers.filter((id) => id !== payload);
      } else {
        state.bannedUsers.push(payload);
      }
    },
  },
  extraReducers: {
    [loginUserThunk.fulfilled]: (state, { payload: { isLogged, login, isCheckOut } }) => {
      if (!state.bannedUsers.includes(login)) {
        state.isLogged = isLogged;
        state.login = login;

        if (isCheckOut) {
          localStorage.setItem('userInfo', JSON.stringify({ login, isLogged }));
        }
      }
    },
  },
});

export const { changeBanStatus } = UserSlice.actions;

export default UserSlice.reducer;
