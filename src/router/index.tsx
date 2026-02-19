import { createBrowserRouter } from "react-router";
import LoginPage from "@/pages/authentication/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
