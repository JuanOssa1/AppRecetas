import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notificationIsDeployed: true,
    notificationInfo: '',
    isLoading: false,
  },
  reducers: {
    setNotification(state, action) {
      state.notificationIsDeployed = action.payload.isDeployed;
      state.notificationInfo = {
        status: action.payload.status,
        title: action.payload.title,
      };
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
