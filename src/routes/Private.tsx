// src/routes/Private.tsx
import { Navigate } from "react-router-dom";

interface PrivateProps {
    children: React.ReactNode;
}

const Private: React.FC<PrivateProps> = ({ children }) => {
    const isAuthenticated = localStorage.getItem("token");
    // OR use your own auth logic

    return isAuthenticated ? <>{children}</> : <Navigate to="/signin" replace />;
};

export default Private;
