import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'register',
  initialState: { user: null },
  reducers: {
    addUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const registerActions = userSlice.actions;

export default userSlice;
