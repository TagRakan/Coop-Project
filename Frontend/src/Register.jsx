import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "Student",
    });

    const { token } = useSelector((state) => state.auth);
    if (token) return <Navigate to="/" replace />;


    const submit = async () => {
        await axios.post("http://localhost:5000/auth/register", form);
        navigate("/login");
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-gray-900 p-6 rounded-2xl w-96">
                <h1 className="text-gray-400 text-2xl text-center mb-4">
                    Create Account
                </h1>

                <input
                    className="w-full p-2 mb-3 bg-gray-950 border border-sg text-gray-300 rounded"
                    placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    className="w-full p-2 mb-3 bg-gray-950 border border-sg text-gray-300 rounded"
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    className="w-full p-2 mb-3 bg-gray-950 border border-sg text-gray-300 rounded"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <select
                    className="w-full p-2 mb-4 bg-gray-950 border border-sg text-gray-300 rounded"
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                    <option>Student</option>
                    <option>Employee</option>
                    <option>Supervisor</option>
                </select>

                <div className="taskb text-center mb-3" onClick={submit}>
                    Register
                </div>

                <Link
                    to="/login"
                    className="text-gray-400 text-sm text-center block hover:text-gray-300"
                >
                    Already have an account? Login
                </Link>
            </div>
        </div>
    );
}

export default Register;
