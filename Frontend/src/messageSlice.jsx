import { createSlice } from "@reduxjs/toolkit";
let messageTimeout = null;
const initialState = {
    message: "",
    type: "error", // success | error
    open: false,
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        openMessage: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type || "error";
            state.open = true;
        },

        closeMessage: (state) => {
            state.open = false;
        },
    },
});

export const sendMessage = (payload) => (dispatch) => {
    if (messageTimeout) {
        clearTimeout(messageTimeout);
    }

    dispatch(messageSlice.actions.openMessage(payload));

    messageTimeout = setTimeout(() => {
        dispatch(messageSlice.actions.closeMessage());
        messageTimeout = null;
    }, 10000);
};

export const { openMessage, closeMessage } = messageSlice.actions;
export default messageSlice.reducer;
