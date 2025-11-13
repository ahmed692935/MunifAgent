import { createBrowserRouter } from "react-router-dom";
import LandingAuth from "./pages/LandingAuth";
import LandingLayout from "./layout/LandingPageLayout/LandingLayout";
import SignIn from "./pages/Auth/SignIn";
import Signup from "./pages/Auth/Signup";
import AddAgents from "./pages/AddAgents";
import Dashboard from "./pages/Dashboard"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingAuth />,
  },
  {
    path: "/landing",
    element: <LandingLayout />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/add-agents",
    element: <AddAgents />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default router;
