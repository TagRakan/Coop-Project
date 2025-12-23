import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sendMessage } from "./messageSlice";

export const fetchTasks = createAsyncThunk(
    "tasks/fetch",
    async (_, { getState, dispatch, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.get("http://localhost:5000/tasks", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (error) {
            dispatch(sendMessage({
                message: "Failed to load tasks. Please try again.",
                type: "error",
            }));
            return rejectWithValue(error.response?.data);
        }
    }
);

export const createTask = createAsyncThunk(
    "tasks/create",
    async (data, { getState, dispatch, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            const res = await axios.post("http://localhost:5000/tasks", data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            dispatch(sendMessage({
                message: "Task created successfully!",
                type: "success",
            }));

            return res.data;
        } catch (error) {
            dispatch(sendMessage({
                message: error.response?.data?.message || "Error creating task.",
                type: "error",
            }));
            return rejectWithValue(error.response?.data);
        }
    }
);

const taskSlice = createSlice({
    name: "tasks",
    initialState: { tasks: [], isLoading: false },
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