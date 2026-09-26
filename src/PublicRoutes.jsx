import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (token) {
    return <Navigate to="/workouts" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PublicRoute;
