import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Requests() {
    const { token } = useSelector((state) => state.auth);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/requests", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setRequests(res.data));
    }, []);

    return (
        <div className="flex flex-col p-3 gap-y-2">
            {requests.map((r) => (
                <div
                    key={r._id}
                    className="bg-gray-950 border border-sg p-2 flex justify-between"
                >
                    <span className="text-gray-300">{r.fileName}</span>
                    <div className="flex gap-x-2">
                        <div
                            className="taskb"
                            onClick={() =>
                                axios.post(
                                    `http://localhost:5000/files/request/${r._id}`,
                                    { status: "Approved" },
                                    { headers: { Authorization: `Bearer ${token}` } }
                                )
                            }
                        >
                            Approve
                        </div>
                        <div
                            className="taskb"
                            onClick={() =>
                                axios.post(
                                    `http://localhost:5000/files/request/${r._id}`,
                                    { status: "Rejected" },
                                    { headers: { Authorization: `Bearer ${token}` } }
                                )
                            }
                        >
                            Reject
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Requests;
