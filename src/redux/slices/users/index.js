import { createSlice } from '@reduxjs/toolkit';

import { fetchUsersIdsThunk, fetchUserThunk } from './asyncThunks';
import { registerUserThunk } from '../user/asyncThunks';

export const UsersSlice = createSlice({
  name: 'users',
  initialState: {
    byId: {},
    allIds: [],
  },
  extraReducers: {
    [fetchUserThunk.fulfilled]: (state, { payload, meta }) => {
      state.byId[meta.arg] = { ...payload };
    },
    [fetchUsersIdsThunk.fulfilled]: (state, { payload }) => {
      state.byId = payload;
      state.allIds = Object.keys(payload);
    },
    [registerUserThunk.fulfilled]: (state, payload) => {
      state.byId[payload.login] = {
        ...payload,
      };
    },
  },
});

export default UsersSlice.reducer;
