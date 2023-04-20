import { configureStore } from '@reduxjs/toolkit';

import notificationSlice from './notifications-slice';
import favoriteSlice from './favorites-slice';

const store = configureStore({
  reducer: {
    notifications: notificationSlice.reducer,
    favorites: favoriteSlice.reducer,
  },
});

export default store;
