import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { login } from "./redux/authSlice.js";

try {
  const saved = localStorage.getItem("auth_user");
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed?.email) {
      store.dispatch(login(parsed));
    }    
  }
} catch (error) {
  console.warn("Failed to parse auth_user", error);
  localStorage.removeItem("auth_user");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
