import Cookies from "js-cookie";

import api from "@/lib/api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export const authService = {
  // Login function
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", credentials);

    const { token, user } = response.data.data;

    // Save JWT as httpOnly cookie (expires in 7 days)
    Cookies.set("jwt", token, {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Save user data to localStorage
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  },

  // Logout function
  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      // Even if logout fails on server, clear local token
      // eslint-disable-next-line no-console
      console.error("Logout error:", error);
    } finally {
      Cookies.remove("jwt");
      localStorage.removeItem("user");
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = Cookies.get("jwt");

    return !!token;
  },

  // Get token from cookie
  getToken: (): string | undefined => {
    return Cookies.get("jwt");
  },

  // Get user from localStorage
  getStoredUser: (): User | null => {
    try {
      const userData = localStorage.getItem("user");

      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  },
};
