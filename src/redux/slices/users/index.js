import { createSlice } from '@reduxjs/toolkit';
import { fetchUsersIdsThunk, fetchUserThunk } from './asyncThunks';

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
  },
});

export const { changeBanStatus } = UsersSlice.actions;

export default UsersSlice.reducer;
