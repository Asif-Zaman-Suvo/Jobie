import { useUser } from "@clerk/clerk-react";
import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IProtectedRouteProps {
  children: ReactNode;
}
const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { pathname } = useLocation();

  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to={"/?sign-in=true"} />;
  }

  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  ) {
    return <Navigate to={"/onboarding"} />;
  }
  return children;
};

export default ProtectedRoute;
