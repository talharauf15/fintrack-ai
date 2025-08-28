import api from "./axios";

export const registerUser = async (userData) => {
  try {
    const res = await api.post("api/auth/register/", userData);
    return res.data;
  } catch (error) {
    console.error("❌ Register failed:", error.response?.data || error.message);
    throw error;
  }
};


export const loginUser = async (credentials) => {
  try {
    const res = await api.post("api/auth/login/", credentials);


    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);

    return res.data;
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    throw error;
  }
};


export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) throw new Error("No refresh token available");

    const res = await api.post("api/auth/refresh/", { refresh });

    // Update access token
    localStorage.setItem("access_token", res.data.access);

    return res.data;
  } catch (error) {
    console.error("❌ Refresh token failed:", error.response?.data || error.message);
    throw error;
  }
};


export const getMe = async () => {
  try {
    const res = await api.get("api/auth/me/");
    return res.data;
  } catch (error) {
    console.error("❌ Fetch user (me) failed:", error.response?.data || error.message);
    throw error;
  }
};


export const logoutUser = async () => {
  try {
    const res = await api.post("api/auth/logout/");


    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    return res.data;
  } catch (error) {
    console.error("❌ Logout failed:", error.response?.data || error.message);
    throw error;
  }
};
