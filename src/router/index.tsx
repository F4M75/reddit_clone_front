import { createBrowserRouter, Navigate } from "react-router";
import { LoginPage } from "@/pages/authentication/login";
import HomePage from "@/pages/home";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SignupPage } from "@/pages/authentication/signup";
import Layout from "@/pages/_layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
