import { useSelector, useDispatch } from "react-redux";
import { login } from "./authSlice";
import { Navigate, Link } from "react-router";
import { useState } from "react";
import Message from "./Message.jsx";
import { sendMessage } from "./messageSlice"; // Import your message action

function Login() {
    const { token, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [form, setForm] = useState({ email: "", password: "" });

    if (token) return <Navigate to="/" replace />;

    const handleLogin = () => {
        if (loading)
            return;
        if (!form.email.trim() || !form.password.trim()) {
            return dispatch(sendMessage({ message: "Please fill in all fields.", type: "error" }));
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            return dispatch(sendMessage({ message: "Invalid email format.", type: "error" }));
        }

        // If valid, proceed to thunk
        dispatch(login(form));
    };

    return (
        <>
            <Message/>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-gray-900 p-6 rounded-2xl w-96">
                    <h1 className="text-gray-400 text-2xl text-center mb-4">Login</h1>

                    <input
                        className="w-full p-2 mb-3 bg-gray-950 border border-sg text-gray-300 rounded"
                        placeholder="Email"
                        type="email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <input
                        type="password"
                        className="w-full p-2 mb-4 bg-gray-950 border border-sg text-gray-300 rounded"
                        placeholder="Password"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <div
                        className={`text-center mb-3 cursor-pointer ${loading ? 'taskb2' : 'taskb'}`}
                        onClick={handleLogin}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </div>

                    <Link to="/register" className="text-gray-400 text-sm text-center block hover:text-gray-300">
                        Create account
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Login;