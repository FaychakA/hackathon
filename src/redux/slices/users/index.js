import { createSlice } from '@reduxjs/toolkit';
import { loginUserThunk } from './asyncThunks';

export const UserSlice = createSlice({
  name: 'users',
  initialState: {
    login: '',
    name: '',
    password: '',
    profilePic: '',
    role: '',
    logged: false,
  },
  extraReducers: {
    [loginUserThunk.fulfilled]: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.logged = payload;
    },
  },
});

export default UserSlice.reducer;
