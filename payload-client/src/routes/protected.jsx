import Home from "../features/Home/Home";
import LoggedInRoot from "../pages/LoggedInRoot";

export const protectedRoutes = [
  {
    path: "/home",
    element: <LoggedInRoot />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
];
