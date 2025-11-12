import { createBrowserRouter } from "react-router-dom";
import LandingAuth from "./pages/LandingAuth";
import LandingLayout from "./layout/LandingPageLayout/LandingLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingAuth />,
  },
  {
    path: "/landing",
    element: <LandingLayout />,
  },
]);

export default router;
