import { useSelector, useDispatch } from "react-redux";
import { increment } from "./store/counterSlice";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

function App() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  const data = [
    { name: "Jan", expense: 400 },
    { name: "Feb", expense: 300 },
    { name: "Mar", expense: 500 },
  ];

  
return(
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-900 text-white">
      <h1 className="text-3xl">Count: {count}</h1>
      <button 
        onClick={() => dispatch(increment())}
        className="px-4 py-2 bg-blue-500 rounded"
      >Increment</button>


<LineChart width={400} height={300} data={data}>
  <CartesianGrid stroke="#ccc" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Line type="monotone" dataKey="expense" stroke="#8884d8" />
</LineChart>

    </div>
    

    
  );
}
export default App;




