
function TaskView() {

    return (
        <div className="flex flex-col max-h-full items-center my-2 p-1 overflow-x-auto">
            <h1 className="text-gray-500 text-center text-2xl">Task Name</h1>
            <div className="flex flex-row gap-x-3 border-b border-sg mb-5 w-full p-3">
                <div className="border-gray-700 taskb">Upload New File</div>
            </div>
            <div className="bg-gray-950 border border-sg min-w-full h-10 flex flex-row gap-x-3 items-center">
                <h4 className="text-gray-500 ml-3 w-80 truncate">File Name</h4>
                <h4 className="text-gray-500 ml-3 w-66">Uploaded By</h4>
                <h4 className="text-gray-500 ml-3">Actions</h4>
            </div>

            <div className="bg-gray-950 border border-t-0 border-sg min-w-full h-12 flex flex-row gap-x-3 items-center">
                <h4 className="text-gray-300 ml-3 w-80 truncate">Pbi.exl</h4>
                <h4 className="text-gray-300 ml-3 w-66">Faisal Alzahrani</h4>
                <div className="border-gray-700 border rounded-lg text-gray-300 p-1 cursor-pointer select-none hover:bg-gray-900 active:bg-gray-800">Download File</div>
                <div className="border-red-700 border rounded-lg text-gray-300 p-1 cursor-pointer select-none hover:bg-red-950 active:bg-red-900">Delete File</div>
            </div>


        </div>
    )
}

export default TaskView;
