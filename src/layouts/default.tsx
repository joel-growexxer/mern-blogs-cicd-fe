import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/auth-context";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="relative flex flex-col h-screen">
      {isAuthenticated && (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm text-default-600">
                Welcome, {user?.email}
              </span>
            </div>
            <Button
              color="danger"
              isLoading={isLoading}
              size="sm"
              variant="ghost"
              onClick={handleLogout}
            >
              {isLoading ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </header>
      )}
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
    </div>
  );
}
