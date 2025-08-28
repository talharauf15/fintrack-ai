import React from "react";
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
import Setting from "./pages/Setting";

import TestIncome from "./pages/TestIncome";
import TestExpense from "./pages/TestExpense";
import TestChatbot from "./pages/TestChatbot";

const TwoColumn = ({ children }) => (
  <div className="flex min-h-screen bg-gray-100">
    <SideBar />
    <main className="flex-1 p-6 overflow-y-auto">{children}</main>
  </div>
);

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
    path: "/settings",
    element: (
      <PrivateRoute>
        <TwoColumn>
          <Setting />
        </TwoColumn>
      </PrivateRoute>
    ),
  },
  {
    path: "/testincome",
    element: (
      <PrivateRoute>
        <TwoColumn>
          <TestIncome />
        </TwoColumn>
      </PrivateRoute>
    ),
  },
  {
    path: "/testexpense",
    element: (
      <PrivateRoute>
        <TwoColumn>
          <TestExpense />
        </TwoColumn>
      </PrivateRoute>
    ),
  },
  {
    path: "/testchatbot",
    element: (
      <PrivateRoute>
        <TwoColumn>
          <TestChatbot />
        </TwoColumn>
      </PrivateRoute>
    ),
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
