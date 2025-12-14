import {Link} from "react-router";
import {useEffect, useState} from "react";
import {fetchNotifications} from "./notificationSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchTasks} from "./taskSlice.js";
import axios from "axios";


function App() {
    const { token } = useSelector((state) => state.auth);
    const [requests, setRequests] = useState([]);
    const handleApprove = async (reqId) => {
        const requestBody = { status: "Approved" };
        await axios.post(
            `http://localhost:5000/files/request/${reqId}`,
            requestBody,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        updateRequests();
    }
    const handleReject = async (reqId) => {
        const requestBody = { status: "Rejected" };
        await axios.post(
            `http://localhost:5000/files/request/${reqId}`,
            requestBody,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        updateRequests();
    }
    const updateRequests = () => {
        axios
            .get("http://localhost:5000/requests", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setRequests(res.data));
    }
    useEffect(() => {
        updateRequests();
    }, []);


    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchNotifications());
    }, []);
    useEffect(() => {
        dispatch(fetchTasks());
    }, []);
    const { tasks } = useSelector((state) => state.tasks);
    const updatedTasks = tasks.slice(0,2)

    return (

    <div className="flex flex-col gap-y-10 items-center p-3">
        <div className="w-[90%] h-72 bg-gray-900 rounded-xl">
            <h1 className="text-2xl text-gray-500 text-center border-sg border-b p-1">Tasks</h1>

            <div className="flex flex-row p-4 gap-x-5">
                {updatedTasks.map((task) => (
                <Link className="bg-gray-950 rounded-2xl w-72 h-52 cursor-pointer hover:bg-gray-800" key={task._id}
                to={'/task/' + task._id}>
                    <p className="text-xl font-bold border-b border-sg p-1 text-gray-500 text-center mt-2">{task.title}</p>
                    <p className="text-gray-400 text-center m-3">{task.description}</p>
                </Link>
                ))}

                <Link to="/tasks" className="bg-gray-900 w-30 h-52 cursor-pointer hover:bg-gray-900 hover:text-gray-700 text-center text-gray-300 justify-center flex items-center">
                    {"View All >"}

                </Link>


            </div>
        </div>
        {(user?.role === "Supervisor" || user?.role === "Student") && (
        <div className="w-[90%] max-w-[90%] h-72 bg-gray-900 rounded-xl">
            <h1 className="text-2xl text-gray-500 text-center border-sg border-b p-1">Update Requests</h1>

            <div className="flex flex-row pl-4 pt-0 pr-4 gap-x-5  max-w-180 max-h-60 pb-9 mt-6 overflow-x-auto overflow-y-hidden ">
                {requests.length === 0 ? (
                    <div className="flex min-w-full h-40 justify-center items-center">
                        <h1 className="text-green-700 text-center font-bold text text-4xl  min-w-full select-none">
                            There is no requests!
                        </h1>
                    </div>
                    ) : user?.role === "Student" ? (
                    <>
                    {requests.map((r) => (
                        <div className="bg-yellow-900 rounded-2xl min-w-72 w-72 h-52" key={r._id}>
                            <p className="text-xl font-bold border-b border-sg p-1 text-gray-300 text-center mt-2">Pending</p>
                            <p className="text-gray-300 text-center m-3">Upload "{r?.fileName}" within {r?.taskName}</p>
                            <p className="text-gray-400 text-center mt-8">Wait for the supervisor..</p>
                        </div>
                    ))}
                    </>
                ) : user?.role === "Supervisor" && (
                    <>
                        {requests.map((r) => (
                            <div className="bg-gray-950 rounded-2xl min-w-72 w-72 h-52" key={r._id}>
                                <p className="text-xl font-bold border-b border-sg p-1 text-gray-300 text-center mt-2">Upload Request</p>
                                <p className="text-gray-300 text-center m-3 text-sm">{r?.studentName} Requesting Upload "{r?.fileName}" within {r?.taskName}</p>
                                <div className="flex flex-col items-center justify-center min-w-full my-3 border-t border-sg">
                                    <div className="border-gray-700 border mt-2 w-[70%] text-center rounded-lg text-gray-300 p-1 cursor-pointer select-none hover:bg-gray-900 active:bg-gray-800"
                                    onClick={() =>
                                         window.open(
                                             `http://localhost:5000/files/reqdownload/${r?._id}`,
                                             "_blank"
                                         )
                                    }
                                    >Download File</div>
                                    <div className="flex flex-row min-w-full justify-center gap-x-5 mt-2">
                                        <div className="border-green-700 border mt-2 w-[35%] text-center rounded-lg text-gray-300 p-1 cursor-pointer select-none hover:bg-green-900 active:bg-green-800"
                                        onClick={() => handleApprove(r?._id)}
                                        >Approve</div>
                                        <div className="border-red-700 border mt-2 w-[35%] text-center rounded-lg text-gray-300 p-1 cursor-pointer select-none hover:bg-red-900 active:bg-red-800"
                                        onClick={() => handleReject(r?._id)}
                                        >Reject</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                    )
                }


            </div>
        </div>
        )}

    </div>
  )
}

export default App
