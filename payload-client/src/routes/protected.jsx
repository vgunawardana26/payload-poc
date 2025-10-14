import Home from "../features/Home/Home";
import LoggedInRoot from "../pages/LoggedInRoot";
import TestFeature from "../features/TestFeature/TestFeature";

export const protectedRoutes = [
  {
    path: "/home",
    element: <LoggedInRoot />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/home/test",
        element: <TestFeature />,
      },
    ],
  },
];
