import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadFile = createAsyncThunk(
    "files/upload",
    async ({ taskId, file }, { getState }) => {
        const token = getState().auth.token;
        const form = new FormData();
        form.append("file", file);
        console.log(taskId);
        const res = await axios.post(
            `http://localhost:5000/files/upload/${taskId}`,
            form,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res.data;
    }
);

export const fetchFiles = createAsyncThunk(
    "files/fetch",
    async (taskId, { getState }) => {
        const token = getState().auth.token;

        const res = await axios.get(
            `http://localhost:5000/files/task/${taskId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res.data;
    }
);

const fileSlice = createSlice({
    name: "files",
    initialState: {
        files: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFiles.fulfilled, (state, action) => {
                state.files = action.payload;
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                if (action.payload?.requested) return;
                state.files.push(action.payload);
            });
    },
});

export default fileSlice.reducer;
