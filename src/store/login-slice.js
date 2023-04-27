import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: { user: null, isLogged: false, isAdmin: false },
  reducers: {
    setUser(state, action) {
      if (action.payload) {
        state.user = action.payload;
        state.isLogged = true;
        if (action.payload.admin) {
          state.isAdmin = true;
        }
      }
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
/**
 * Preguntas:
 * Las slices deben ser lo mas genricas posibles o puden tener codigo tipo
 * como validar si el role debe ser admin o no
 */
