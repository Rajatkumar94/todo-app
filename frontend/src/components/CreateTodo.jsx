import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../features/todo/todoSlice";

function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let todo = {
      title: title,
      description: description,
    };

    dispatch(createTodo(todo));
  };
  return (
    <div style={{ display: "block" }}>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="Title"
        />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          value={description}
          placeholder="Description"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateTodo;
