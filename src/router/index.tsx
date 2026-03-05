import { createBrowserRouter, Navigate } from "react-router";
import { LoginPage } from "@/pages/authentication/login";
import HomePage from "@/pages/home";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SignupPage } from "@/pages/authentication/signup";

export const router = createBrowserRouter([
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
]);
