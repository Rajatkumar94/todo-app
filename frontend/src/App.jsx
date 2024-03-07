import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";
import TodoApp from "./components/Chat";
import NavBar from "./components/NavBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className=" dark:bg-gradient-to-r from-slate-500 to-slate-800 h-screen ">
      <NavBar />
      <div className="flex p-10">
        <div className=" pr-7">
          <CreateTodo />
        </div>
        <div>
          <Todos />
        </div>
      </div>
    </div>
  );
}

export default App;
