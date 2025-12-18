import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sendMessage } from "./messageSlice";

export const uploadFile = createAsyncThunk(
    "files/upload",
    async ({ taskId, file }, { getState, dispatch, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            const form = new FormData();
            form.append("file", file);

            const res = await axios.post(
                `http://localhost:5000/files/upload/${taskId}`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            dispatch(sendMessage({
                message: "File uploaded successfully!",
                message2: 'File upload request sent successfully!',
                type: "success",
            }));

            return res.data;
        } catch (error) {
            dispatch(sendMessage({
                message: error.response?.data?.message || "Failed to upload file. Please try again.",
                type: "error",
            }));
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchFiles = createAsyncThunk(
    "files/fetch",
    async (taskId, { getState, dispatch, rejectWithValue }) => {
        try {
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
        } catch (error) {
            dispatch(sendMessage({
                message: "Error fetching files. Please refresh the page.",
                type: "error",
            }));
            return rejectWithValue(error.response.data);
        }
    }
);


const fileSlice = createSlice({
    name: "files",
    initialState: {
        files: [],
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFiles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchFiles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.files = action.payload;
            })
            .addCase(fetchFiles.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(uploadFile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload?.requested) return;
                state.files.push(action.payload);
            })
            .addCase(uploadFile.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default fileSlice.reducer;
