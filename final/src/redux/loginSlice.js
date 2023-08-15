// loginSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Replace with your API endpoint
const LOGIN_API_ENDPOINT = 'http://127.0.0.1:5000/api/login';

export const loginAsync = createAsyncThunk('login/loginAsync', async (credentials) => {
  const response = await fetch(LOGIN_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const data = await response.json();
    return data.access_token;
  } else {
    throw new Error('Login failed');
  }
});

export const logoutAsync = createAsyncThunk('login/logoutAsync', async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const accessToken = state.login.accessToken;
  
    if (!accessToken) {
      throw new Error('No access token found');
    }
  
    try {
      const response = await fetch('http://127.0.0.1:5000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Logout failed');
      }
  
      return true; // Return a success flag if logout is successful
    } catch (error) {
      throw new Error('Logout failed');
    }
  });

export const logout = () => {
    // You can perform any additional cleanup here if needed
    return { type: 'login/logout' };
  };
  

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    accessToken: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.accessToken = null;
        state.error = action.error.message;
     
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.accessToken = null;
        state.error = null;
      });
  },
});

export default loginSlice.reducer;
export const selectAccessToken = (state) => state.login.accessToken;
export const selectLoginError = (state) => state.login.error;
