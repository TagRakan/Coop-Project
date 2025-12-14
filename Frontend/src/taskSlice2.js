import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [
        {
            id: 1,
            title: "Design a Dashboard",
            description: "Design a full-functioned PowerBI dashboard",
        },
        {
            id: 2,
            title: "Design a image",
            description: "Design an image that can be used as an icon for the dashboard",
        },
        {
            id: 3,
            title: "Design an icon",
            description: "Design an icon",
        }
    ],

}

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        markRead: (state) => {
            const movedNotifications = state.tasks;
            console.log(movedNotifications);
        },
    },
});


export const {markRead} = taskSlice.actions;
export default taskSlice.reducer;