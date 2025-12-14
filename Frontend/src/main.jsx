import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store";

import Layout from "./Layout";
import App from "./App";
import Tasks from "./Tasks";
import TaskView from "./TaskView";
import Notifications from "./Notifications";
import Requests from "./Requests";
import Login from "./Login";
import Register from "./Register";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Provider store={store}>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<Layout />}>
                    <Route path="/" element={<App />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/task/:id" element={<TaskView />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/requests" element={<Requests />} />
                </Route>
            </Routes>
        </Provider>
    </BrowserRouter>
);
