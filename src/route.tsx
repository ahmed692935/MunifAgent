import { createBrowserRouter } from "react-router-dom";
import LandingAuth from "./pages/LandingAuth";
import LandingPage from "./pages/LandingPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingAuth />,
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
]);

export default router;
