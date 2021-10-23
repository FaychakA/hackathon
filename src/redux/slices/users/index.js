import { createSlice } from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'users',
  initialState: {
    user: {
      login: '',
      name: '',
      password: '',
      profilePic: '',
    },
  },
});

export default UserSlice.reducer;
