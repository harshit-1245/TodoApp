import React, { useEffect, useState } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

useEffect(()=>{
  getApi();
},[todos])
const getApi=()=>{
  fetch('http://localhost:3001/todo',{
    method:'GET'
  })
  .then(res=>res.json())
  .then(data=>setTodos(data))
  
}

 const addTodo = async() => {
  const data=await fetch('http://localhost:3001/todo',{
    method:'POST',
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      todo:newTodo
    })
  }).then(res=>res.json())
  setTodos([...todos,data])
  setNewTodo('');
  };

  const deleteTodo = async(id) => {
    const data =await fetch(`http://localhost:3001/todo/${id}`,{
      method:'DELETE',
    }).then((res=>res.json()))
    setTodos(todos.filter(todo=>todo._id!==data._id))

  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="add-todo">
        <input
          type="text"
          id="todo-input"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button id="add-button" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li className="todo-item" key={todo.id}>
            <input type="checkbox" />
            {todo.todo}
            <button
              className="delete-button"
              onClick={() => deleteTodo(todo._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
