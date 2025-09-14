import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";

import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { useAuth } from "@/contexts/auth-context";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login({ email, password });
      navigate("/"); // Redirect to home page after successful login
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <DefaultLayout>
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md p-4">
          <CardHeader className="flex flex-col gap-3 pb-6">
            <h1 className={title({ size: "sm" })}>Sign In</h1>
            <p className="text-default-600">
              Welcome back! Please sign in to your account.
            </p>
            <div className="p-3 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-semibold mb-2">Test Credentials:</p>
              <p>
                <strong>Email:</strong> user1@example.com
              </p>
              <p>
                <strong>Password:</strong> password123
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                  {error}
                </div>
              )}
              <Input
                isRequired
                label="Email"
                placeholder="Enter your email"
                type="email"
                value={email}
                variant="bordered"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                isRequired
                label="Password"
                placeholder="Enter your password"
                type="password"
                value={password}
                variant="bordered"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="w-full mt-10"
                color="primary"
                isLoading={isLoading}
                type="submit"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </DefaultLayout>
  );
}
