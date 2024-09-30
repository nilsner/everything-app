// src/features/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { adminUsers } from '../admins';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AuthState = {
  user: null,
  isAdmin: false,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isAdmin = adminUsers.includes(action.payload?.uid || '');
    },
    setStatus(state, action: PayloadAction<AuthState['status']>) {
      state.status = action.payload;
      state.status = action.payload;
    },
  },
});

export const { setUser, setStatus } = authSlice.actions;
export default authSlice.reducer;
