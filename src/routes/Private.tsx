// src/routes/Private.tsx
import { Navigate } from "react-router-dom";

interface PrivateProps {
    children: React.ReactNode;
}

const Private: React.FC<PrivateProps> = ({ children }) => {
    const isAuthenticated = localStorage.getItem("token");
    // OR use your own auth logic

    // const userStr = localStorage.getItem("user");
    // const user = userStr ? JSON.parse(userStr) : null;
    // const location = window.location.pathname;

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    // 1. If user needs onboarding (onboard = false) and NOT on /onboarding -> Redirect to /onboarding
    // if (!user?.is_admin && user?.onboard === false && location !== "/onboarding") {
    //     return <Navigate to="/onboarding" replace />;
    // }

    // 2. If user HAS onboarded (onboard = true) AND is on /onboarding -> Redirect to /dashboard
    // if (user?.onboard === true && location === "/onboarding") {
    //     return <Navigate to="/dashboard" replace />;
    // }

    return <>{children}</>;
};

export default Private;
