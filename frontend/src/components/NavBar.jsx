import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchTodo } from "../features/todo/todoSlice";

function NavBar() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const handleChange = (e) => {
    setSearch(e.target.value);
    dispatch(searchTodo(search));
  };

  return (
    <div className="bg-gradient-to-r from-neutral-300 to-stone-400 flex justify-between p-5 rounded-lg  text-xl text-red-300 font-bold">
      <h2 className="p-4">Todo app</h2>
      <div>
        <input
          className="rounded p-4"
          type="text"
          placeholder="search todos"
          value={search}
          onChange={handleChange}
        />
        <button className="bg-green-300 p-4 rounded-md ml-2">Search</button>
      </div>
    </div>
  );
}

export default NavBar;
