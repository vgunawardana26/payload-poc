import LoggedInRoot from "../pages/LoggedInRoot";

export const protectedRoutes = [
  {
    path: "/signed-in",
    element: <LoggedInRoot />,
  },
];
