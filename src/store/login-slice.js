import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: { role: 'ADMIN', isLogged: false },
  reducers: {
    setLogStatus(state, action) {
      state.role = action.payload.role;
      state.isLogged = true;
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
