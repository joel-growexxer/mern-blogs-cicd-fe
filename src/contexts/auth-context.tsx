import type { ReactNode } from "react";

import { createContext, useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authService, type User, type LoginCredentials } from "@/services/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user state from localStorage if authenticated
    if (authService.isAuthenticated()) {
      return authService.getStoredUser();
    }

    return null;
  });
  const queryClient = useQueryClient();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setUser(data.user);
      // Invalidate all queries to refetch with new auth headers
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error("Login failed:", error);
      setUser(null);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      setUser(null);
      queryClient.clear(); // Clear all cached data
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error("Logout failed:", error);
      // Still clear user data even if server logout fails
      setUser(null);
      queryClient.clear();
    },
  });

  const login = async (credentials: LoginCredentials) => {
    await loginMutation.mutateAsync(credentials);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user && authService.isAuthenticated(),
    isLoading: loginMutation.isPending || logoutMutation.isPending,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
