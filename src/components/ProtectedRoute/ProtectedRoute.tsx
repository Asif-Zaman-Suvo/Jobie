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
  return children;
};

export default ProtectedRoute;
