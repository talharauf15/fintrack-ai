// src/hooks/useLogout.js
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

export default function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return () => {
    // 1) Clear redux auth
    dispatch(logout());
    // 2) Clear persisted user
    localStorage.removeItem("auth_user");
    // 3) Go to login and block back button
    navigate("/login", { replace: true });
  };
}
