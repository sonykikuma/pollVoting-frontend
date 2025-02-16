import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import PollDetail from "./pages/PollDetail.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/poll/:id", element: <PollDetail /> },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
