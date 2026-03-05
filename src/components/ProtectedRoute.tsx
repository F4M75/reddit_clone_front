import { Navigate } from "react-router";
import { useUserStore } from "@/store/user.store";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useUserStore((state) => state.token);

  if (!token) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
