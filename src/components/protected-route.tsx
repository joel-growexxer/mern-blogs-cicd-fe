import type { ReactNode } from "react";

import UnauthenticatedView from "@/components/unauthenticated-view";
import { useAuth } from "@/contexts/auth-context";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <UnauthenticatedView />;
  }

  return <>{children}</>;
}
