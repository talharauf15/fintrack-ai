import { useSelector, useDispatch } from "react-redux";
import { increment } from "./store/counterSlice";

function App() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-gray-900 text-white">
      <h1 className="text-3xl">Count: {count}</h1>
      <button 
        onClick={() => dispatch(increment())}
        className="px-4 py-2 bg-blue-500 rounded"
      >Increment</button>
    </div>
  );
}
export default App;