import { Navigate } from "react-router-dom";

function ProtectLogin({isAuthenticated, children}) {
    if(!isAuthenticated) {
        return <Navigate to = "/login" replace />;
    }

    return children
}

export default ProtectLogin;