// src/routes/Public.tsx
import { Navigate } from "react-router-dom";

interface PublicProps {
    children: React.ReactNode;
}

const Public: React.FC<PublicProps> = ({ children }) => {
    const isAuthenticated = localStorage.getItem("token");

    return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

export default Public;
