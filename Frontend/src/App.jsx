import { Link } from "react-router";
import { useEffect, useState } from "react";
import { fetchNotifications } from "./notificationSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./taskSlice.js";
import axios from "axios";
import { sendMessage } from "./messageSlice";

function App() {
    const { token, user } = useSelector((state) => state.auth);
    const { tasks, isLoading } = useSelector((state) => state.tasks);
    const [requests, setRequests] = useState([]);
    const dispatch = useDispatch();

    const updateRequests = () => {
        axios
            .get("http://localhost:5000/requests", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setRequests(res.data))
            .catch(() => {
                dispatch(sendMessage({ message: "Failed to load requests", type: "error" }));
            });
    };

    const handleApprove = async (reqId) => {
        try {
            const requestBody = { status: "Approved" };
            await axios.post(
                `http://localhost:5000/files/request/${reqId}`,
                requestBody,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            dispatch(sendMessage({ message: "Request approved successfully", type: "success" }));
            updateRequests();
        } catch (error) {
            dispatch(sendMessage({
                message: error.response?.data?.message || "Error approving request",
                type: "error"
            }));
        }
    };

    const handleReject = async (reqId) => {
        try {
            const requestBody = { status: "Rejected" };
            await axios.post(
                `http://localhost:5000/files/request/${reqId}`,
                requestBody,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            dispatch(sendMessage({ message: "Request rejected successfully", type: "success" }));
            updateRequests();
        } catch (error) {
            dispatch(sendMessage({
                message: error.response?.data?.message || "Error rejecting request",
                type: "error"
            }));
        }
    };

    useEffect(() => {
        updateRequests();
        dispatch(fetchNotifications());
        dispatch(fetchTasks());
    }, [dispatch, token]);

    const updatedTasks = tasks.slice(0, 2);

    return (
        <div className="flex flex-col gap-y-10 items-center p-3">
            {/* Tasks Section */}
            <div className="w-[90%] h-72 bg-gray-900 rounded-xl">
                <h1 className="text-2xl text-gray-500 text-center border-sg border-b p-1">Tasks</h1>
                <div className="flex flex-row p-4 gap-x-5">
                    {isLoading ? (
                        <div className="flex justify-center items-center text-center h-50 w-full text-gray-400">
                            Loading tasks...
                        </div>
                    ) : (
                        <>
                            {updatedTasks.map((task) => (
                                <Link
                                    className="bg-gray-950 rounded-2xl w-72 h-52 cursor-pointer hover:bg-gray-800"
                                    key={task._id}
                                    to={'/task/' + task._id}
                                >
                                    <p className="text-xl font-bold border-b border-sg p-1 text-gray-500 text-center mt-2">{task.title}</p>
                                    <p className="text-gray-400 text-center m-3">{task.description}</p>
                                </Link>
                            ))}
                            <Link to="/tasks" className="bg-gray-900 w-32 h-52 rounded-2xl cursor-pointer hover:bg-gray-800 hover:text-gray-100 text-center text-gray-300 justify-center flex items-center">
                                {"View All >"}
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Requests Section */}
            {(user?.role === "Supervisor" || user?.role === "Student") && (
                <div className="w-[90%] max-w-[90%] h-72 bg-gray-900 rounded-xl">
                    <h1 className="text-2xl text-gray-500 text-center border-sg border-b p-1">Update Requests</h1>
                    <div className="flex flex-row px-4 gap-x-5 max-w-full max-h-60 pb-9 mt-6 overflow-x-auto">
                        {requests.length === 0 ? (
                            <div className="flex min-w-full h-40 justify-center items-center">
                                <h1 className="text-green-700 text-center font-bold text-4xl select-none">
                                    There are no requests!
                                </h1>
                            </div>
                        ) : user?.role === "Student" ? (
                            requests.map((r) => (
                                <div className="bg-yellow-900 rounded-2xl min-w-72 w-72 h-52" key={r._id}>
                                    <p className="text-xl font-bold border-b border-sg p-1 text-gray-300 text-center mt-2">Pending</p>
                                    <p className="text-gray-300 text-center m-3">Upload "{r?.fileName}" within {r?.taskName}</p>
                                    <p className="text-gray-400 text-center mt-8">Wait for the supervisor..</p>
                                </div>
                            ))
                        ) : (
                            requests.map((r) => (
                                <div className="bg-gray-950 rounded-2xl min-w-72 w-72 h-52" key={r._id}>
                                    <p className="text-xl font-bold border-b border-sg p-1 text-gray-300 text-center mt-2">Upload Request</p>
                                    <p className="text-gray-300 text-center m-3 text-sm">{r?.studentName} Requesting Upload "{r?.fileName}" within {r?.taskName}</p>
                                    <div className="flex flex-col items-center justify-center min-w-full my-3 border-t border-sg">
                                        <div
                                            className="border-gray-700 border mt-2 w-[70%] text-center rounded-lg text-gray-300 p-1 cursor-pointer select-none hover:bg-gray-800"
                                            onClick={() => {
                                                dispatch(sendMessage({ message: "Download started", type: "success" }));
                                                window.open(`http://localhost:5000/files/reqdownload/${r?._id}`, "_blank");
                                            }}
                                        >
                                            Download File
                                        </div>
                                        <div className="flex flex-row min-w-full justify-center gap-x-5 mt-2">
                                            <div className="border-green-700 border w-[35%] text-center rounded-lg text-gray-300 p-1 cursor-pointer hover:bg-green-900"
                                                 onClick={() => handleApprove(r?._id)}
                                            >Approve</div>
                                            <div className="border-red-700 border w-[35%] text-center rounded-lg text-gray-300 p-1 cursor-pointer hover:bg-red-900"
                                                 onClick={() => handleReject(r?._id)}
                                            >Reject</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;