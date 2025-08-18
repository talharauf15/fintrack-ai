// import { useSelector, useDispatch } from "react-redux";
// import { increment } from "./store/counterSlice";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";

// function App() {
//   const count = useSelector(state => state.counter.value);
//   const dispatch = useDispatch();

//   const data = [
//     { name: "Jan", expense: 400 },
//     { name: "Feb", expense: 300 },
//     { name: "Mar", expense: 500 },
//   ];

//   return (
//     <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-900 text-white">
//       <h1 className="text-3xl">Count: {count}</h1>
//       <button
//         onClick={() => dispatch(increment())}
//         className="px-4 py-2 bg-blue-500 rounded"
//       >
//         Increment
//       </button>

//       <LineChart width={400} height={300} data={data}>
//         <CartesianGrid stroke="#ccc" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Line type="monotone" dataKey="expense" stroke="#8884d8" />
//       </LineChart>
//     </div>
//   );
// }
// export default App;






// import { useEffect } from "react";
// import { db } from "./firebase";
// import { collection, addDoc, getDocs } from "firebase/firestore";

// function App() {
//   useEffect(() => {
//     const testFirebase = async () => {
//       // Write test
//       await addDoc(collection(db, "test"), { message: "Hello Firebase!" });

//       // Read test
//       const snapshot = await getDocs(collection(db, "test"));
//       snapshot.forEach(doc => console.log(doc.data()));
//     };
//     testFirebase();
//   }, []);

//   return <h1 className="text-black">Check console for Firebase logs</h1>;
// }

// export default App;


import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Income from './pages/Income';
import Expense from './pages/Expense';
import Ai from './pages/Ai';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import SideBar from './components/SideBar';

const TwoColumn = ({ children }) => (
  <div className="flex min-h-screen bg-gray-100">
    <SideBar />
    <main className="flex-1 p-6 overflow-y-auto">{children}</main>
  </div>
);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <TwoColumn>
          <Dashboard />
        </TwoColumn>
      )
    },
    {
      path: "/income",
      element: (
        <TwoColumn>
          <Income />
        </TwoColumn>
      )
    },
    {
      path: "/expense",
      element: (
        <TwoColumn>
          <Expense />
        </TwoColumn>
      )
    },
    {
      path: "/reports",
      element: (
        <TwoColumn>
          <div className="text-gray-800">Reports page</div>
        </TwoColumn>
      )
    },
    {
      path: "/ai",
      element: (
        <TwoColumn>
          <Ai />
        </TwoColumn>
      )
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "signup",
      element: <Signup/>
    },
    {
      path:"*",
      element:<NotFound/>
    }
  ]
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App