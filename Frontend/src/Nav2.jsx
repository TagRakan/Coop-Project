import './index.css'
import {Link} from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "./authSlice";



function Nav() {
    const dispatch = useDispatch();

    return (

        <div className="flex flex-col items-center gap-y-8 rounded-2xl p-3 h-162 w-74 border border-sg">
            <Link to='/' className="navbutton">Home</Link>
            <Link to='/notifications' className="navbutton relative">Notifications
                <span className="absolute top-0 right-[-10px] w-3 h-3 bg-red-500 rounded-full border-2 border-red-500">
                        <span className="sr-only">New notifications</span>
                    </span>
            </Link>
            <Link to='/tasks' className="navbutton">Tasks</Link>
            <div
                className="navlogout cursor-pointer"
                onClick={() => dispatch(logout())}
            >
                Logout
            </div>
        </div>

    );
}

export default Nav;