import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { logoutUser } from "../api/userApi";

export default function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout API failed:", err?.response?.data || err?.message || err);
    } finally {
      dispatch(logout());
      localStorage.removeItem("auth_user");
      navigate("/login", { replace: true });
    }
  };
}
