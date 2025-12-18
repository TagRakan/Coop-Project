import { useDispatch, useSelector } from "react-redux";
import { closeMessage } from "./messageSlice";

function Message() {
    const dispatch = useDispatch();
    const { open, message, message2, type } = useSelector((state) => state.message);
    const { user } = useSelector((state) => state.auth);

    if (!open) return null;

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <div
                className={`px-4 py-3 rounded-2xl rounded shadow-lg text-gray-300
          ${type === "success" && "bg-green-800"}
          ${type === "error" && "bg-red-800"}
        `}
            >
                <div className="flex items-center gap-4">
                    <span className="font-bold">{message2 && (message2 !== "" && user.role === "Student") ? message2 : message}</span>
                    <button
                        onClick={() => dispatch(closeMessage())}
                        className="font-bold hover:opacity-70 active:opacity-50 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Message;
