import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

//create action for creating the slice
export const createTodo = createAsyncThunk(
  "createTodo",
  async (todo, { rejectWithValue }) => {
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    try {
      const result = await response.json();
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

//Read Action
export const showAllTodos = createAsyncThunk(
  "showAllTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/todos/all");
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//delete action
export const deletedTodo = createAsyncThunk(
  "deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/delete/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//edit action
export const editTodo = createAsyncThunk(
  "editTodo",
  async (todo, { rejectWithValue }) => {
    console.log("editTodo", todo);

    const { id, title, description } = todo;
    console.log(title, description, todo.id);
    try {
      const response = await fetch(`http://localhost:3000/todos/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const result = await response.json();
      return result;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload.todo);
      })
      .addCase(showAllTodos.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(showAllTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(deletedTodo.fulfilled, (state, action) => {
        const { _id } = action.payload.deletedTodo;
        if (_id) {
          state.todos = state.todos.filter((t) => t._id !== _id);
        }
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((t) =>
          t._id === action.payload.id ? action.payload : t
        );
      });
  },
});

export default todoSlice.reducer;
