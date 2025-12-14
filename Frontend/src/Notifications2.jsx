import { useSelector } from "react-redux";

function Notifications() {
    const {notifications, unreadNotifications} = useSelector((state) => state.notifications);
    return (
        <div className="flex flex-col-reverse max-h-full gap-y-2 items-center p-3 overflow-x-auto">
            {notifications.map((notification, index) => (
                <div className="bg-gray-950 border border-sg min-w-full h-8 flex items-center" key={index}>
                    <h4 className="text-gray-300 ml-3">{notification}</h4>
                </div>
            ))}
            {unreadNotifications.map((notification, index) => (
                <div className="bg-gray-900 border border-sg min-w-full h-8 flex items-center" key={index}>
                    <h4 className="text-gray-300 ml-3">{notification}</h4>
                </div>
            ))}



        </div>
    )
}

export default Notifications
