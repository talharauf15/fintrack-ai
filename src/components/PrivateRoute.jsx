import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const user = useSelector(state => state.auth.user);
  return user ? children : <Navigate to="/login" />;
}