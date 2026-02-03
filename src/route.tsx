// route.tsx
import { createBrowserRouter } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/Auth/SignIn";
// import Signup from "./pages/Auth/Signup";
import AddAgents from "./pages/AddAgents";
import Dashboard from "./pages/Dashboard";
import AgentDetails from "./pages/AgentDetails";
import Users from "./pages/Users";

// Route Guards
import Private from "./routes/Private";
import Public from "./routes/Public";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

// User Routes
import UserDashboard from "./pages/User/Dashboard";
import CallLogs from "./pages/User/CallLogs";
// import Agent from "./pages/User/Agent";
import Profile from "./pages/User/Profile";

import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import Onboarding from "./pages/User/Onboarding";

const RoleBasedDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user?.is_admin) {
    return <Dashboard />;
  }
  return <UserDashboard />;
};


const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/signin",
    element: (
      <Public>
        <SignIn />
      </Public>
    ),
  },
  // {
  //   path: "/signup",
  //   element: (
  //     <Public>
  //       <Signup />
  //     </Public>
  //   ),
  // },

  // PRIVATE ROUTES
  {
    path: "/add-agent",
    element: (
      <Private>
        <AddAgents />
      </Private>
    ),
  },
  {
    path: "/users",
    element: (
      <Private>
        <Users />
      </Private>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Private>
        <RoleBasedDashboard />
      </Private>
    ),
  },
  {
    path: "/agent/:id",
    element: (
      <Private>
        <AgentDetails />
      </Private>
    ),
  },
  {
    path: "/call-logs",
    element: (
      <Private>
        <CallLogs />
      </Private>
    ),
  },
  // {
  //   path: "/agent",
  //   element: (
  //     <Private>
  //       <Agent />
  //     </Private>
  //   ),
  // },
  {
    path: "/profile",
    element: (
      <Private>
        <Profile />
      </Private>
    ),
  },
  {
    path: "/onboarding",
    element: (
      <Private>
        <Onboarding />
      </Private>
    ),
  }
]);

export default router;
