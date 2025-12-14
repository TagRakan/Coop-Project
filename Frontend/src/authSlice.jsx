import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sendMessage } from "./messageSlice";

const API = "http://localhost:5000/auth";

export const login = createAsyncThunk(
    "auth/login",
    async (form, thunkAPI) => {
        try {
            const res = await axios.post(`${API}/login`, form);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            thunkAPI.dispatch(
                sendMessage({
                    message: "Login successful",
                    type: "success",
                })
            );

            return res.data;
        } catch (err) {
            thunkAPI.dispatch(
                sendMessage({
                    message:
                        err.response?.data?.message || "Login failed. Try again.",
                    type: "error",
                })
            );

            return thunkAPI.rejectWithValue(
                err.response?.data || "Login failed"
            );
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null,
        loading: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.loading = false;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
