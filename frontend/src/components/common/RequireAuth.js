import useAuth from "../../utils/Auth";
import useUserStore from "../../storages/AuthStore";
import { Navigate } from "react-router-dom";


export default function RequireAuth({ children }) {
    const { authStatus } = useAuth();
    const { token } = useUserStore()

    return (authStatus === true || token != "") ? children : <Navigate to="/login" replace />;
}
