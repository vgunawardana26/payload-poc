import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { publicRoutes } from "./routes/public";

const router = createBrowserRouter([...publicRoutes]);

function App() {
  return (
    <>
      <RouterProvider router={router}>
        <div className="brand--blue">
          <div className="bg-primary-200">Hi there!</div>
        </div>
        <div className="brand--teal">
          <div className="bg-primary-200">Hi there!</div>
        </div>
        <div className="brand--blue">
          <div className="bg-accent-canary">Hi there!</div>
        </div>
      </RouterProvider>
    </>
  );
}

export default App;
