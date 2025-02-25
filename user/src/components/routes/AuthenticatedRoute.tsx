import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRoute = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Outlet />;
  }
  return <Navigate to="/registration" />;
};
export default AuthenticatedRoute;
