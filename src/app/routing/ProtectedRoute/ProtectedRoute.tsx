import { FC } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  isAllowed: boolean;
  redirectPath: string;
  children: JSX.Element;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  isAllowed,
  redirectPath,
  children,
}) => {
  if (!isAllowed) return <Navigate to={redirectPath} replace />;

  return children;
};

export default ProtectedRoute;
