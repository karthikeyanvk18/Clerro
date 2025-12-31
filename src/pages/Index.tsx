import { Navigate } from "react-router-dom";

export default function Index() {
  // Redirect to login page as entry point
  return <Navigate to="/login" replace />;
}
