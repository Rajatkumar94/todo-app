import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos:[{
        id:1,
        title: "",
        description: "",
        completed: false,
    }]
}

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers:{
        addTodo:(state, action)=>{
            
        }
    }
})
