import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk("tasks/fetch", async (_, { getState }) => {
    const token = getState().auth.token;
    const res = await axios.get("http://localhost:5000/tasks", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
});

export const createTask = createAsyncThunk("tasks/create", async (data, { getState }) => {
    const token = getState().auth.token;
    const res = await axios.post("http://localhost:5000/tasks", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
});

const taskSlice = createSlice({
    name: "tasks",
    initialState: { tasks: [], isLoading: false, },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(createTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
                state.isLoading = false;
            })
            .addCase(createTask.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default taskSlice.reducer;
