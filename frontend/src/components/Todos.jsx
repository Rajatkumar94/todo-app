import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletedTodo,
  showAllTodos,
  editTodo,
  toggleTodo,
} from "../features/todo/todoSlice";

function Todos() {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState({ title: "", description: "" });
  const [filterOption, setFilterOption] = useState("ALL");
  const dispatch = useDispatch();

  const { todos, searchData } = useSelector((state) => state.todos);

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilterOption(value);
    // onFilterChange(value);
  };

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
    dispatch(toggleTodo(id));
  };

  useEffect(() => {
    dispatch(showAllTodos());
  }, []);

  return (
    <Suspense>
      <div>
        <div>
          <span>Apply filter</span>
          <input
            type="radio"
            id="all"
            name="filter"
            value="ALL"
            checked={filterOption === "ALL"}
            onChange={handleFilterChange}
          />
          <label htmlFor="all">All</label>

          <input
            type="radio"
            id="completed"
            name="filter"
            value="COMPLETED"
            checked={filterOption === "COMPLETED"}
            onChange={handleFilterChange}
          />
          <label htmlFor="completed">Completed</label>

          <input
            type="radio"
            id="notCompleted"
            name="filter"
            value="NOT_COMPLETED"
            checked={filterOption === "NOT_COMPLETED"}
            onChange={handleFilterChange}
          />
          <label htmlFor="notCompleted">Not Completed</label>
        </div>
        {
          todos
            .filter((todo) => {
              if (searchData.length === 0) {
                return todo;
              } else {
                return todo.title
                  .toLowerCase()
                  .includes(searchData.toLowerCase());
              }
            }).filter((todo) => {
              if(filterOption === "NOT_COMPLETED") {
                return todo.completed===false
              }else if(filterOption === "COMPLETED"){
                return todo.completed===true
              }else{
                return true
              }
            })
            .map((todo) => (
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
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                      onClick={() => toggleCompleted(todo._id)}
                    />
                    <input
                      type="text"
                      name="description"
                      value={todo.description}
                      readOnly
                      style={{
                        textDecoration: todo.completed
                          ? "line-through"
                          : "none",
                      }}
                      onClick={() => toggleCompleted(todo._id)}
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
