import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { notificationIsDeployed: false, notificationInfo: null },
  reducers: {
    deployNotification(state, action) {
      setTimeout(() => {
        state.notificationIsDeployed = true;
      }, action.payload.time);
      state.notificationIsDeployed = false;
    },
    setNotificationInfo(state, action) {
      state.notificationInfo = {
        status: action.payload.status,
        title: action.payload.title,
      };
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
