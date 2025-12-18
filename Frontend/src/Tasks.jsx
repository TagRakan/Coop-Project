import { useDispatch, useSelector } from "react-redux";
import { createTask, fetchTasks } from "./taskSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchNotifications } from "./notificationSlice.js";
import { sendMessage } from "./messageSlice";

function Tasks() {
    const dispatch = useDispatch();
    const { tasks, isLoading } = useSelector((state) => state.tasks);
    const { user } = useSelector((state) => state.auth);

    const [form, setForm] = useState({ title: "", description: "" });

    useEffect(() => {
        dispatch(fetchTasks());
    }, []);
    useEffect(() => {
        dispatch(fetchNotifications());
    }, []);

    const handleCreate = async () => {
        if (!form.title.trim() || !form.description.trim()) {
            dispatch(sendMessage({
                message: "Please fill in both title and description",
                type: "error"
            }));
            return;
        }

        if (form.title.length < 3) {
            dispatch(sendMessage({
                message: "Title must be at least 3 characters long",
                type: "error"
            }));
            return;
        }

        const result = await dispatch(createTask(form));

        if (createTask.fulfilled.match(result)) {
            setForm({ title: "", description: "" });
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 text-gray-400">
                Loading tasks...
            </div>
        );
    }

    return (
        <div className="flex flex-row-reverse flex-wrap-reverse gap-4 p-3 overflow-x-auto">
            {tasks.map((task) => (
                <Link
                    key={task._id}
                    className="bg-gray-900 rounded-2xl w-101 h-52 cursor-pointer hover:bg-gray-800"
                    to={'/task/' + task._id}>
                    <p className="text-xl font-bold border-b border-sg p-1 text-gray-500 text-center mt-2">
                        {task.title}
                    </p>
                    <p className="text-gray-400 text-center m-3">{task.description}</p>
                </Link>
            ))}

            {user?.role === "Supervisor" && (
                <div className="w-full border-b border-sg p-3 flex gap-x-2">
                    <input
                        className="bg-gray-950 border border-sg text-gray-300 p-1"
                        placeholder="Title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                    />
                    <input
                        className="bg-gray-950 border border-sg text-gray-300 p-1"
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                    <div
                        className={`taskb ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
                        onClick={handleCreate}
                    >
                        {isLoading ? "Creating..." : "Create Task"}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Tasks;