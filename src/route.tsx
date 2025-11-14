import { createBrowserRouter } from "react-router-dom";
import LandingAuth from "./pages/LandingAuth";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/Auth/SignIn";
import Signup from "./pages/Auth/Signup";
import AddAgents from "./pages/AddAgents";
import Dashboard from "./pages/Dashboard";
import AgentDetails from "./pages/AgentDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingAuth />,
  },
  {
    path: "/landing",
    element: <LandingPage />,
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
    path: "/add-agent",
    element: <AddAgents />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/agent/:id",
    element: <AgentDetails />,
  },
]);

export default router;
