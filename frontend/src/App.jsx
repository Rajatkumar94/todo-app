import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";
import TodoApp from "./components/Chat";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CreateTodo />
      <Todos />
      <TodoApp />
    </>
  );
}

export default App;
