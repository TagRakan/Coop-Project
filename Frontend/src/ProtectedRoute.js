import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const userToken = useSelector((state) => state.user.userToken);
    if (!userToken) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
