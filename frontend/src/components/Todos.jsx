import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletedTodo,
  showAllTodos,
  editTodo,
} from "../features/todo/todoSlice";

function Todos() {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState({ title: "", description: "" });
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditValue((prevEditValue) => ({
      ...prevEditValue,
      [name]: value,
    }));
  };

  const startEditing = (id, todo) => {
    const { title, description } = todo;
    setEditingId(id);
    setEditValue({ title, description });
  };

  const finishEditing = () => {
    console.log("edit value", editValue);
    dispatch(editTodo({ id: editingId, ...editValue }));
    setEditingId();
  };

  const toggleCompleted = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  useEffect(() => {
    dispatch(showAllTodos());
  }, []);

  return (
    <Suspense>
      <div>
        <h1>Todos</h1>
        {todos.map((todo) => (
          <li key={todo._id}>
            {editingId === todo._id ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={editValue.title}
                  onChange={handleEditInputChange}
                />

                <input
                  type="text"
                  name="description"
                  value={editValue.description}
                  onChange={handleEditInputChange}
                />
                <button onClick={finishEditing}>Save</button>
              </>
            ) : (
              <div
                key={todo._id}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                <input
                  type="text"
                  name="title"
                  value={todo.title}
                  readOnly
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                  onClick={() => toggleCompleted(todo.id)}
                />
                <input
                  type="text"
                  name="description"
                  value={todo.description}
                  readOnly
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                  onClick={() => toggleCompleted(todo.id)}
                />
                <button onClick={() => startEditing(todo._id, todo)}>
                  Edit
                </button>
                <button onClick={() => dispatch(deletedTodo(todo._id))}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </div>
    </Suspense>
  );
}

export default Todos;
