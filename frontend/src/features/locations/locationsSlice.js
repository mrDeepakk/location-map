import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/client';

export const fetchLocations = createAsyncThunk('locations/fetch', async (_, { getState }) => {
  const token = getState().auth.token; return await api('/api/locations', { token });
});

export const addLocation = createAsyncThunk('locations/add', async (payload, { getState }) => {
  const token = getState().auth.token; return await api('/api/locations', { method: 'POST', body: payload, token });
});

export const uploadZip = createAsyncThunk('locations/uploadZip', async (file, { getState }) => {
  const token = getState().auth.token;
  const fd = new FormData(); fd.append('file', file);
  return await api('/api/locations/upload-zip', { method: 'POST', token, body: fd, isForm: true });
});

const slice = createSlice({
  name: 'locations',
  initialState: { items: [], status: 'idle', error: null, toast: null },
  reducers: {
    clearToast(state){ state.toast = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (s)=>{ s.status='loading'; })
      .addCase(fetchLocations.fulfilled, (s,a)=>{ s.status='idle'; s.items = a.payload.locations; })
      .addCase(fetchLocations.rejected, (s,a)=>{ s.status='idle'; s.error=a.error.message; })
      .addCase(addLocation.fulfilled, (s,a)=>{ s.items = [a.payload.location, ...s.items]; })
      .addCase(uploadZip.fulfilled, (s,a)=>{ s.toast = { type: 'success', msg: `Imported ${a.payload.count} locations` }; s.items = [...a.payload.locations, ...s.items]; })
      .addCase(uploadZip.rejected, (s,a)=>{ s.toast = { type: 'error', msg: a.error.message }; });
  }
});

export const { clearToast } = slice.actions;
export default slice.reducer;