// Todos.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TodoCard from '../components/TodoCard';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    fetch('http://localhost:8083/api/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  useEffect(() => {
    const fetchTodos = () => {
      let url = 'http://localhost:8083/api/todos';
      if (selectedUser) {
        url = `http://localhost:8083/api/todos/byuser/${selectedUser}`;
      }
      fetch(url)
        .then(response => response.json())
        .then(data => setTodos(data));
    };

    fetchTodos();
  }, [selectedUser]);

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Manage Todos</h1>
        <p className="text-lg mb-8">Keep your tasks under control, one click at a time!</p>
        <div className="mb-4">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {todos.map(todo => (
            <TodoCard
              key={todo.id}
              todo={todo}
              user={users.find(user => user.id === todo.userid)}
              updateTodo={updateTodo}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Todos;
