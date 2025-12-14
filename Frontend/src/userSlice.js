// src/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const token = localStorage.getItem('token') || null;

const initialState = {
    token,
    user: token ? JSON.parse(localStorage.getItem('user')) : null,
    status: 'idle',
    error: null
};

// Async thunks
export const loginUser = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}/login`, credentials);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});

export const registerUser = createAsyncThunk('user/register', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}/register`, data);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = { id: action.payload.userId, username: action.payload.username, role: action.payload.role };
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(state.user));
            });
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
