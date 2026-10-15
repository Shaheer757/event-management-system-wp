import { createSlice } from '@reduxjs/toolkit';

const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

const initialState = {
  users: storedUsers,
  user: storedCurrentUser,
  isAuthenticated: !!storedCurrentUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('currentUser');
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;