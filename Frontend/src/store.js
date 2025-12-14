import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import tasks from "./taskSlice";
import files from "./fileSlice";
import notifications from "./notificationSlice";

export const store = configureStore({
  reducer: { auth, tasks, files, notifications },
});
