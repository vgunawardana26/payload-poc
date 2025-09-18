import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { publicRoutes } from "./routes/public";
import { DeviceSizeContextProvider } from "./globals/context/DeviceSizeContextProvider";
import { AuthProvider } from "./globals/auth/AuthProvider";
import { protectedRoutes } from "./routes/protected";
import ProtectedRouteComponent from "./routes/ProtectedRouteComponent";
import { ThemeProvider } from "./globals/context/ThemeProvider";

//App routes - public and private

const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes.map((route) => ({
    ...route,
    element: <ProtectedRouteComponent>{route.element}</ProtectedRouteComponent>,
  })),
]);

function App() {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <DeviceSizeContextProvider>
            <RouterProvider router={router}></RouterProvider>
          </DeviceSizeContextProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
