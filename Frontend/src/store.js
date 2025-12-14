import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import tasks from "./taskSlice";
import files from "./fileSlice";
import notifications from "./notificationSlice";
import message from "./messageSlice";

export const store = configureStore({
  reducer: { auth, tasks, files, notifications, message },
});
