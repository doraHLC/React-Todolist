import { useAuth } from "./Context";
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({children}) => {
    const { token } = useAuth();
    if (!token){
        console.log("Not logged in!");
        return <Navigate to="/" replace />;
    }
    return children
};