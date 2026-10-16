import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import registrationsReducer from './slices/registrationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registrations: registrationsReducer,
  },
});