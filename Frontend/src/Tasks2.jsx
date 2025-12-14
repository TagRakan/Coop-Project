import {useSelector} from "react-redux";

function Tasks() {
    const {tasks} = useSelector((state) => state.tasks);

    return (
        <div className="flex flex-row max-h-full max-w-[644em] flex-wrap gap-4 items-center p-3 overflow-x-auto">
            <div className="flex flex-row gap-x-3 border-b border-sg mb-5 w-full p-3">
                <div className="border-gray-700 taskb">Add New Task</div>
            </div>
            {tasks.map((task, index) => (
                <div className="bg-gray-900 rounded-2xl w-101 h-52 cursor-pointer hover:bg-gray-800" key={index}>
                    <p className="text-xl font-bold border-b border-sg p-1 text-gray-500 text-center mt-2">{task.title}</p>
                    <p className="text-gray-400 text-center m-3">{task.description}</p>
                </div>
            ))}



        </div>
    )
}

export default Tasks
