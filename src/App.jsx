import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Ai from "./pages/Ai";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import SideBar from "./components/SideBar";
import PrivateRoute from "./components/PrivateRoute";


const TwoColumn = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-100">
      <SideBar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />
      <main className={`${sidebarCollapsed ? 'ml-20' : 'ml-64'} p-6 overflow-y-auto min-h-screen transition-all duration-200`}>
        {children}
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <TwoColumn>
          <Dashboard />
        </TwoColumn>
      </PrivateRoute>
    ),
  },
  {
    path: "/income",
    element: (
      <PrivateRoute>
        <TwoColumn>
          <Income />
        </TwoColumn>
      </PrivateRoute>
    ),
  },
  {
    path: "/expense",
    element: (
      <PrivateRoute>
        <TwoColumn>
          <Expense />
        </TwoColumn>
      </PrivateRoute>
    ),
  },
  {
    path: "/ai",
    element: (
      <PrivateRoute>
        <TwoColumn>
          <Ai />
        </TwoColumn>
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
