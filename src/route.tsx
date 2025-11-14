// route.tsx
import { createBrowserRouter } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/Auth/SignIn";
import Signup from "./pages/Auth/Signup";
import AddAgents from "./pages/AddAgents";
import Dashboard from "./pages/Dashboard";
import AgentDetails from "./pages/AgentDetails";

// Route Guards
import Private from "./routes/Private";
import Public from "./routes/Public";

const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    path: "/",
    element: (
      <LandingPage />
    ),
  },
  {
    path: "/signin",
    element: (
      <Public>
        <SignIn />
      </Public>
    ),
  },
  {
    path: "/signup",
    element: (
      <Public>
        <Signup />
      </Public>
    ),
  },

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
    path: "/dashboard",
    element: (
      <Private>
        <Dashboard />
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
]);

export default router;
