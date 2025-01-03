import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  user: { username: string; role: string } | null;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem('token'),
  user: localStorage.getItem('username')
    ? { username: localStorage.getItem('username')!, role: localStorage.getItem('userRole')! }
    : null,
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: { username: string; role: string } }>) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userRole', action.payload.user.role);
      localStorage.setItem('username', action.payload.user.username);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('username');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
