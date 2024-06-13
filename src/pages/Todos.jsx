// Todos.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TodoCard from '../components/TodoCard';
import TodoDrawer from '../components/TodoDrawer';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [isCreateMode, setIsCreateMode] = useState(false);

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

  const addTodo = (todo) => {
    fetch('http://localhost:8083/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
      .then(response => response.json())
      .then(data => setTodos([...todos, data]));

    setIsDrawerOpen(false);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
  };

  const handleCreateNewTodo = () => {
    const userId = selectedUser ? parseInt(selectedUser, 10) : (users.length > 0 ? users[0].id : 0);
    
    setCurrentTodo({
      description: '',
      category: '',
      deadline: '',
      priority: 'Low',
      userid: userId
    });
    setIsCreateMode(true);
    setIsDrawerOpen(true);
  };
  

  const handleEditTodo = (todo) => {
    setCurrentTodo(todo);
    setIsCreateMode(false);
    setIsDrawerOpen(true);
  };

  const handleSave = (todo) => {
    if (isCreateMode) {
      addTodo(todo);
    } else {
      fetch(`http://localhost:8083/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      })
        .then(response => response.json())
        .then(savedTodo => {
          updateTodo(savedTodo);
          setIsDrawerOpen(false);
        });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Manage Todos</h1>
        <p className="text-lg mb-8">Keep your tasks under control, one click at a time!</p>
        <div className="mb-4 flex justify-between items-center">
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
          {selectedUser && (
            <button
              onClick={handleCreateNewTodo}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Add New Todo
            </button>
          )}
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {todos.map(todo => (
            <TodoCard
              key={todo.id}
              todo={todo}
              user={users.find(user => user.id === todo.userid)}
              updateTodo={updateTodo}
              onEdit={() => handleEditTodo(todo)}
            />
          ))}
        </div>
      </div>
      {currentTodo && (
        <TodoDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          todo={currentTodo}
          onSave={handleSave}
          isCreateMode={isCreateMode}
        />
      )}
    </Layout>
  );
};

export default Todos;
