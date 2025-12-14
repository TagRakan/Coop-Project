import {Link} from "react-router";
import {useEffect} from "react";
import {fetchNotifications} from "./notificationSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchTasks} from "./taskSlice.js";


function App() {
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
                <div className="bg-gray-950 rounded-2xl w-72 h-52 cursor-pointer hover:bg-gray-800">
                    <p className="text-xl font-bold border-b border-sg p-1 text-gray-500 text-center mt-2">{task.title}</p>
                    <p className="text-gray-400 text-center m-3">{task.description}</p>
                </div>
                ))}

                <Link to="/tasks" className="bg-gray-900 w-30 h-52 cursor-pointer hover:bg-gray-900 hover:text-gray-700 text-center text-gray-300 justify-center flex items-center">
                    {"View All >"}

                </Link>


            </div>
        </div>

        <div className="w-[90%] max-w-[90%] h-72 bg-gray-900 rounded-xl">
            <h1 className="text-2xl text-gray-500 text-center border-sg border-b p-1">Update Requests</h1>

            <div className="flex flex-row pl-4 pt-0 pr-4 gap-x-5  max-w-180 max-h-55 mt-6 overflow-x-auto overflow-y-hidden ">
                <div className="bg-yellow-900 rounded-2xl min-w-72 w-72 h-52 cursor-pointer">
                    <p className="text-xl font-bold border-b border-sg p-1 text-gray-300 text-center mt-2">Pending</p>
                    <p className="text-gray-300 text-center m-3">Upload "Pb2.exl within Design a Dashboard</p>
                    <p className="text-gray-400 text-center mt-8">Wait for the supervisor..</p>
                </div>
                <div className="bg-yellow-900 rounded-2xl min-w-72 w-72 h-52 cursor-pointer">
                    <p className="text-xl font-bold border-b border-sg p-1 text-gray-300 text-center mt-2">Pending</p>
                    <p className="text-gray-300 text-center m-3">Upload "Pb2.exl within Design a Dashboard</p>
                    <p className="text-gray-400 text-center mt-8">Wait for the supervisor..</p>
                </div><div className="bg-yellow-900 rounded-2xl min-w-72 w-72 h-52 cursor-pointer">
                <p className="text-xl font-bold border-b border-sg p-1 text-gray-300 text-center mt-2">Pending</p>
                <p className="text-gray-300 text-center m-3">Upload "Pb2.exl within Design a Dashboard</p>
                <p className="text-gray-400 text-center mt-8">Wait for the supervisor..</p>
            </div><div className="bg-yellow-900 rounded-2xl min-w-72 w-72 h-52 cursor-pointer">
                <p className="text-xl font-bold border-b border-sg p-1 text-gray-300 text-center mt-2">Pending</p>
                <p className="text-gray-300 text-center m-3">Upload "Pb2.exl within Design a Dashboard</p>
                <p className="text-gray-400 text-center mt-8">Wait for the supervisor..</p>
            </div>


            </div>
        </div>

    </div>
  )
}

export default App
