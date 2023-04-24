import { configureStore } from '@reduxjs/toolkit';

import notificationSlice from './notifications-slice';
import favoriteSlice from './favorites-slice';
import loginSlice from './login-slice';

const store = configureStore({
  reducer: {
    notifications: notificationSlice.reducer,
    favorites: favoriteSlice.reducer,
    login: loginSlice.reducer,
  },
});

export default store;
