import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "./notificationSlice";

function Notifications() {
    const dispatch = useDispatch();
    const { notifications, isLoading } = useSelector((state) => state.notifications);

    useEffect(() => {
        dispatch(fetchNotifications(true));
    }, []);
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 text-gray-400">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex flex-col-reverse gap-y-2 p-3">
            {notifications.map((n) => (
                <div
                    key={n._id}
                    className={ n?.read === false ? "bg-gray-900 border border-sg p-2 text-gray-300" : "bg-gray-950 border border-sg p-2 text-gray-300"}
                >
                    {n.message}
                </div>
            ))}
        </div>
    );
}

export default Notifications;
