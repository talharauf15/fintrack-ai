import { useState } from "react";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { loginUser, getMe } from "../api/userApi";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state for form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const credentials = {
      username: email, 
      email, 
      password,
    };

    try {
      const tokenData = await loginUser(credentials);
      // console.log("✅ tokens:", tokenData);
      const user = await getMe();
      // console.log("✅ me:", user);

      dispatch(loginAction(user));
      localStorage.setItem(
        "auth_user",
        JSON.stringify({
          id: user.id,
          name: user.username || user.first_name || user.email,
          email: user.email,
        })
      );

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Login error:", err);

      const msg =
        err?.response?.data?.detail ||
        err?.response?.data ||
        err?.message ||
        "Login failed. Please check your credentials.";
      setError(typeof msg === "object" ? JSON.stringify(msg) : msg);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Email or Username"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          autoComplete="username"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
