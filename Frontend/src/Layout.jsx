import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";
import Nav from "./Nav.jsx";
import "./index.css";

function Layout() {
    const { token } = useSelector((state) => state.auth);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="mpage">
            <Nav />
            <div className="mcontainer">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
