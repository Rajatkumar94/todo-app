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
  const [editValue, setEditValue] = useState({});
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos.todos);

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditValue((prevEditValue) => ({
      ...prevEditValue,
      [name]: value,
    }));
  };

  const startEditing = (id, text) => {
    const { title, description, completed } = text;
    setEditingId(id);
    setEditValue({
      title: title,
      description: description,
      // completed: completed,
    });
  };

  const finishEditing = () => {
    console.log("edit value", editValue);
    dispatch(editTodo({ _id: editingId, ...editValue }));
    setEditingId(null);
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
              <div key={todo._id}>
                <input type="text" name="title" value={todo.title} />
                <input
                  type="text"
                  name="description"
                  value={todo.description}
                />

                <button onClick={() => startEditing(todo._id, todo)}>
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deletedTodo(todo._id))}
                  type="button"
                >
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
