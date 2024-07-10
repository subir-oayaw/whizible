import { Navigate, useLocation } from "react-router-dom";
// HOOK
import useAuth from "app/hooks/useAuth";
// CUSTOM COMPONENT
import LoaderWithThoughts from "../../app/contexts/LoaderWithThoughts"; // Adjust the path as needed

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();

  if (!isInitialized) {
    return <LoaderWithThoughts />; // Show the loader while initialization is in progress
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <Navigate replace to="/signin" state={{ from: pathname }} />;
}
