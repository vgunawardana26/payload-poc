import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";

export const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
];
