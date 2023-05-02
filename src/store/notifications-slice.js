import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { notificationIsDeployed: true, notificationInfo: '' },
  reducers: {
    setNotification(state, action) {
      state.notificationIsDeployed = action.payload.isDeployed;
      state.notificationInfo = {
        status: action.payload.status,
        title: action.payload.title,
      };
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
