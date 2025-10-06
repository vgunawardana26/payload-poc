import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";

export const publicRoutes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
];
