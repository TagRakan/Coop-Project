import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux"; // Added useDispatch
import { Navigate } from "react-router";
import { sendMessage } from "./messageSlice";
import Message from "./Message.jsx";

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "Student",
    });

    const { token } = useSelector((state) => state.auth);
    if (token) return <Navigate to="/" replace />;

    const validate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
            dispatch(sendMessage({ message: "All fields are required!", type: "error" }));
            return false;
        }
        if (!emailRegex.test(form.email)) {
            dispatch(sendMessage({ message: "Please enter a valid email address.", type: "error" }));
            return false;
        }
        return true;
    };

    const submit = async () => {
        if (!validate()) return;
        setLoading(true);

        try {
            await axios.post("http://localhost:5000/auth/register", form);
            dispatch(sendMessage({ message: "Account created! Please login.", type: "success" }));
            navigate("/login");
        } catch (error) {
            dispatch(sendMessage({
                message: error.response?.data?.message || "Registration failed.",
                type: "error"
            }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Message/>
        <div className="flex items-center justify-center h-screen">
            <div className="bg-gray-900 p-6 rounded-2xl w-96">
                <h1 className="text-gray-400 text-2xl text-center mb-4">Create Account</h1>

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

                <div
                    className={`text-center mb-3 cursor-pointer ${loading ? 'taskb2' : 'taskb'}`}
                     onClick={submit}>
                    {loading ? "Registering..." : "Register"}
                </div>

                <Link to="/login" className="text-gray-400 text-sm text-center block hover:text-gray-300">
                    Already have an account? Login
                </Link>
            </div>
        </div>
        </>

    );
}

export default Register;