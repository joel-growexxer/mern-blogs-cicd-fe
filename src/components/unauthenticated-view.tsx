import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useNavigate } from "react-router-dom";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function UnauthenticatedView() {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate("/signin");
  };

  return (
    <DefaultLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md text-center p-4">
          <CardHeader className="flex flex-col gap-3 pb-6">
            <h1 className={title({ size: "sm", color: "blue" })}>
              Unauthenticated
            </h1>
            <p className="text-default-600">
              You need to be logged in to access this page.
            </p>
          </CardHeader>
          <CardBody>
            <Button
              className="w-full mt-6"
              color="primary"
              size="lg"
              onClick={handleNavigateToLogin}
            >
              Go to Login
            </Button>
          </CardBody>
        </Card>
      </div>
    </DefaultLayout>
  );
}
