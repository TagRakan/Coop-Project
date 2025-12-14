import { useDispatch, useSelector } from "react-redux";
import { uploadFile, fetchFiles } from "./fileSlice";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

function TaskView() {
    const dispatch = useDispatch();
    const { files } = useSelector((state) => state.files);
    const { user, token } = useSelector((state) => state.auth);
    const { tasks } = useSelector((state) => state.tasks);
    const { id } = useParams();
    useEffect(() => {
        dispatch(fetchFiles(id));
    }, [id]);

    const handleDelete = async (fileId) => {
        await axios.delete(`http://localhost:5000/files/${fileId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(fetchFiles(id));
    };

    return (
        <div className="flex flex-col max-h-full items-center my-2 p-1 overflow-x-auto">
            <h1 className="text-gray-500 text-center text-2xl">{tasks.find(task => task._id === id)?.title}</h1>

            <div className="flex flex-row gap-x-3 border-b border-sg mb-5 w-full p-3">
                <input
                    type="file"
                    className="text-gray-300"
                    onChange={(e) =>
                        dispatch(uploadFile({ taskId: id, file: e.target.files[0] }))
                    }
                />
            </div>

            <div className="bg-gray-950 border border-sg min-w-full h-10 flex flex-row gap-x-3 items-center">
                <h4 className="text-gray-500 ml-3 w-80 truncate">File Name</h4>
                <h4 className="text-gray-500 ml-3 w-66">Uploaded By</h4>
                <h4 className="text-gray-500 ml-3">Actions</h4>
            </div>

            {files.map((file) => (
                <div
                    key={file._id}
                    className="bg-gray-950 border border-t-0 border-sg min-w-full h-12 flex flex-row gap-x-3 items-center"
                >
                    <h4 className="text-gray-300 ml-3 w-80 truncate">{file.name}</h4>
                    <h4 className="text-gray-300 ml-3 w-66">{file.uploadedByName}</h4>

                    <div
                        className="border-gray-700 border rounded-lg text-gray-300 p-1 cursor-pointer select-none hover:bg-gray-900 active:bg-gray-800"
                        onClick={() =>
                            window.open(
                                `http://localhost:5000/files/download/${file._id}`,
                                "_blank"
                            )
                        }
                    >
                        Download File
                    </div>

                    {(user.role === "Supervisor" || user._id === file.uploadedBy) && (
                        <div
                            className="border-red-700 border rounded-lg text-gray-300 p-1 cursor-pointer select-none hover:bg-red-950 active:bg-red-900"
                            onClick={() => handleDelete(file._id)}
                        >
                            Delete File
                        </div>
                    )}
                    
                </div>
            ))}

            {user?.role === "Student" && (
                <p className="text-yellow-500 mt-3">
                    Upload requires supervisor approval
                </p>
            )}
        </div>
    );
}

export default TaskView;
