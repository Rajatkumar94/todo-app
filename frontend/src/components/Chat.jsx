import React, { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEditInputChange = (event) => {
    setEditValue(event.target.value);
  };

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleCompleted = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditValue(text);
  };

  const finishEditing = () => {
    setTodos(todos.map(todo =>
      todo.id === editingId ? { ...todo, text: editValue } : todo
    ));
    setEditingId(null);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <>
                <input type="text" value={editValue} onChange={handleEditInputChange} />
                <button onClick={finishEditing}>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                  onClick={() => toggleCompleted(todo.id)}
                >
                  {todo.text}
                </span>
                <button onClick={() => startEditing(todo.id, todo.text)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
