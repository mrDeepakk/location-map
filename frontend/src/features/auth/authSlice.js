import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/client';

const tokenKey = 'lm_token';
const userKey = 'lm_user';

const savedToken = localStorage.getItem(tokenKey);
const savedUser = JSON.parse(localStorage.getItem(userKey) || 'null');

export const registerUser = createAsyncThunk('auth/register', async (payload) => {
  return await api('/api/auth/register', { method: 'POST', body: payload });
});

export const loginUser = createAsyncThunk('auth/login', async (payload) => {
  return await api('/api/auth/login', { method: 'POST', body: payload });
});

const slice = createSlice({
  name: 'auth',
  initialState: { token: savedToken || null, user: savedUser, status: 'idle', error: null },
  reducers: {
    logout(state) {
      state.token = null; state.user = null;
      localStorage.removeItem(tokenKey); localStorage.removeItem(userKey);
    }
  },
  extraReducers: (builder) => {
    const fulfilled = (state, action) => {
      state.token = action.payload.token; state.user = action.payload.user; state.error = null;
      localStorage.setItem(tokenKey, state.token); localStorage.setItem(userKey, JSON.stringify(state.user));
    };
    const pending = (state) => { state.status = 'loading'; state.error = null; };
    const rejected = (state, action) => { state.status = 'idle'; state.error = action.error.message; };

    builder
      .addCase(registerUser.pending, pending)
      .addCase(registerUser.fulfilled, (s,a)=>{ s.status='idle'; fulfilled(s,a); })
      .addCase(registerUser.rejected, rejected)
      .addCase(loginUser.pending, pending)
      .addCase(loginUser.fulfilled, (s,a)=>{ s.status='idle'; fulfilled(s,a); })
      .addCase(loginUser.rejected, rejected);
  }
});

export const { logout } = slice.actions;
export default slice.reducer;