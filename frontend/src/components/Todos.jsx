import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletedTodo,
  showAllTodos,
  editTodo,
} from "../features/todo/todoSlice";

function Todos() {
  const [isEditable, setIsEditable] = useState(false);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);

  // console.log("todos", todos);

  const handleSubmit = (todoId) => {
    if (editableTodos[todoId]) {
      // If already editing, dispatch editTodo
      dispatch(editTodo(todoId));
      setEditableTodos({ ...editableTodos, [todoId]: false }); // Reset editing state
    } else {
      // If not editing, toggle editing state
      setEditableTodos({ ...editableTodos, [todoId]: true });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding property in the state object
    setTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(showAllTodos());
  }, []);
  return (
    <Suspense>
      <div>
        <h1>Todos</h1>
        {todos.length === 0 ? (
          <p>Loading...</p>
        ) : (
          todos.map((todo) => (
            <div key={todo._id}>
              <h2
                contentEditable={`${isEditable}`}
                name="title"
                onInput={handleInputChange}
              >
                {todo.title}
              </h2>
              <p
                contentEditable={`${isEditable}`}
                name="description"
                onInput={handleInputChange}
              >
                {" "}
                {todo.description}
              </p>
              <button type="button" key={todo._id} onClick={handleSubmit}>
                {isEditable ? "submit" : "edit"}
              </button>
              <button
                key={todo._id}
                onClick={() => dispatch(deletedTodo(todo._id))}
                type="button"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </Suspense>
  );
}

export default Todos;
