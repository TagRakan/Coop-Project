import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotifications = createAsyncThunk(
    "notifications/fetch",
    async (bool, { getState }) => {
        const token = getState().auth.token;
        if (bool === true) {
            await axios.patch("http://localhost:5000/notifications", '_', {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        const res = await axios.get("http://localhost:5000/notifications", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    }
);

const notificationSlice = createSlice({
    name: "notifications",
    initialState: { notifications: [] },
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            state.notifications = action.payload;
        });
    },
});

export default notificationSlice.reducer;
