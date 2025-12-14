import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: [
        "Your request to update the file \"PBi.exl\" has been rejected",
        "Your request to update the file \"PBi.exl\" has been rejected",
        "Your request to update the file \"PBi.exl\" has been approved",
        "Your request to update the file \"PBi.exl\" has been rejected",
        "Your request to update the file \"PBi.exl\" has been approved",
    ],
    unreadNotifications: [
        "Your request to update the file \"PBi.exl\" has been approved",
    ]
     
}

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        markRead: (state) => {
            const movedNotifications = state.unreadNotifications.slice();
            state.notifications.push(...movedNotifications);
        },
    },
});


export const {markRead} = notificationSlice.actions;
export default notificationSlice.reducer;